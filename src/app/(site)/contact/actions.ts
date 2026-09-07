"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { getCachedPayload } from "@/lib/payload";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX_SUBMISSIONS = 5;

async function getClientIp(): Promise<string> {
  const h = await headers();
  const forwardedFor = h.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim() || "unknown";
  return h.get("x-real-ip") || "unknown";
}

async function verifyTurnstile(token: string | null, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    // Not configured — don't block submissions in dev/before setup, but this
    // means Turnstile isn't actually protecting the form yet. See README.
    return true;
  }
  if (!token) return false;

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
    });
    const data = (await response.json()) as { success: boolean };
    return data.success;
  } catch (error) {
    console.error("[contact] Turnstile verification request failed:", error);
    return false;
  }
}

export async function submitLead(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // Honeypot — a real visitor never sees or fills this field (see
  // src/components/ContactForm.tsx). Any bot that fills every input on the
  // page trips it. Return a success-shaped response so the bot doesn't learn
  // anything from a distinct error state.
  if (String(formData.get("company_website") || "").trim() !== "") {
    return { status: "success", message: "Thanks — we'll get back to you within two working days." };
  }

  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const projectType = String(formData.get("projectType") || "") || undefined;
  const budgetBand = String(formData.get("budgetBand") || "") || undefined;
  const timeline = String(formData.get("timeline") || "") || undefined;
  const message = String(formData.get("message") || "").trim();
  const turnstileToken = String(formData.get("cf-turnstile-response") || "") || null;

  if (!name || !email || !message) {
    return { status: "error", message: "Name, email and a short message are required." };
  }

  const ip = await getClientIp();

  const humanVerified = await verifyTurnstile(turnstileToken, ip);
  if (!humanVerified) {
    return { status: "error", message: "We couldn't verify you're human — please try again." };
  }

  try {
    const payload = await getCachedPayload();

    if (ip !== "unknown") {
      const recent = await payload.count({
        collection: "leads",
        where: {
          and: [
            { ipAddress: { equals: ip } },
            { createdAt: { greater_than: new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString() } },
          ],
        },
      });
      if (recent.totalDocs >= RATE_LIMIT_MAX_SUBMISSIONS) {
        return {
          status: "error",
          message: "You've submitted a few of these already — we'll be in touch on the ones we have.",
        };
      }
    }

    await payload.create({
      collection: "leads",
      data: {
        name,
        email,
        phone: phone || undefined,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        projectType: projectType as any,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        budgetBand: budgetBand as any,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        timeline: timeline as any,
        message,
        status: "new",
        ipAddress: ip,
      },
    });
  } catch (error) {
    console.error("[contact] failed to save lead:", error);
    return {
      status: "error",
      message: "Something went wrong saving your inquiry. Please email us directly.",
    };
  }

  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      const resend = new Resend(resendApiKey);
      const notifyEmail = process.env.CONTACT_NOTIFICATION_EMAIL;

      if (notifyEmail) {
        await resend.emails.send({
          from: "Neo Lens Studios <notifications@neolensstudios.com>",
          to: notifyEmail,
          replyTo: email,
          subject: `New inquiry from ${name}`,
          text: [
            `Name: ${name}`,
            `Email: ${email}`,
            `Phone: ${phone || "—"}`,
            `Project type: ${projectType || "—"}`,
            `Budget: ${budgetBand || "—"}`,
            `Timeline: ${timeline || "—"}`,
            "",
            message,
          ].join("\n"),
        });
      }

      // Confirmation to the prospect — separate from the internal
      // notification above, so they know it actually went through.
      await resend.emails.send({
        from: "Neo Lens Studios <hello@neolensstudios.com>",
        to: email,
        subject: "We got your inquiry — Neo Lens Studios",
        text: [
          `Hi ${name.split(" ")[0]},`,
          "",
          "Thanks for reaching out to Neo Lens Studios — we've received your inquiry and will get back to you within two working days.",
          "",
          "Here's what you sent us:",
          message,
          "",
          "If anything changes on your end in the meantime (timeline, budget, scope), just reply to this email.",
          "",
          "— Neo Lens Studios",
        ].join("\n"),
      });
    }
  } catch (error) {
    // The lead is already saved — an email hiccup shouldn't block the
    // visitor's confirmation on-screen.
    console.error("[contact] lead saved but a notification/confirmation email failed:", error);
  }

  return {
    status: "success",
    message: "Thanks — we'll get back to you within two working days.",
  };
}
