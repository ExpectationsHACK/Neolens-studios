"use client";

import { useActionState, useState } from "react";
import Script from "next/script";
import { submitLead, type ContactFormState } from "@/app/(site)/contact/actions";
import { BUDGET_BANDS, PROJECT_TYPES, TIMELINES, buildLeadWhatsAppUrl, type Option } from "@/lib/leadWhatsApp";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const initialState: ContactFormState = { status: "idle" };

export function ContactForm({ defaultMessage }: { defaultMessage?: string }) {
  const [state, formAction, isPending] = useActionState(submitLead, initialState);
  const [whatsAppUrl, setWhatsAppUrl] = useState<string | null>(null);

  // Runs inside the submit click, so the browser allows the new tab. The
  // server action still saves the lead afterwards as a backup record.
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    const form = event.currentTarget;
    if (String(new FormData(form).get("company_website") || "").trim() !== "") return;
    const url = buildLeadWhatsAppUrl(new FormData(form));
    setWhatsAppUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  if (state.status === "success") {
    // `whatsAppUrl` is only set when this page's script opened WhatsApp on
    // submit. If the visitor submitted before the script loaded, the server's
    // copy of the link is the only way their details reach WhatsApp.
    const opened = whatsAppUrl !== null;
    const link = whatsAppUrl ?? state.whatsAppUrl;
    return (
      <div className="rounded-2xl border border-accent/40 bg-surface p-8 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">
          {opened ? "Almost there" : "One last step"}
        </p>
        <p className="mt-2 text-text">
          {opened
            ? "We've opened WhatsApp with your project details. Tap send there so they reach us."
            : "Send your project details to us on WhatsApp to finish."}{" "}
          {state.message}
        </p>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-body text-xs font-semibold uppercase tracking-wider text-black transition-transform hover:scale-105"
          >
            {opened ? "WhatsApp didn't open? Send it here" : "Send on WhatsApp"}{" "}
            <span className="link-arrow">→</span>
          </a>
        )}
      </div>
    );
  }

  return (
    <form action={formAction} onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot — hidden from real visitors via off-screen positioning
          (not display:none, which some bots know to skip), never filled by
          a human. See src/app/(site)/contact/actions.ts. */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", top: "-9999px" }}
      >
        <label htmlFor="company_website">Company website</label>
        <input
          id="company_website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Your Name" name="name" required />
        <Field label="Company / Brand" name="company" />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Email" name="email" type="email" required />
        <Field label="Phone Number" name="phone" type="tel" />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <SelectField label="Project Type" name="projectType" options={PROJECT_TYPES} />
        <SelectField label="Budget Range" name="budgetBand" options={BUDGET_BANDS} />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <SelectField label="Expected Timeline" name="timeline" options={TIMELINES} />
      </div>
      <div>
        <label
          htmlFor="message"
          className="font-body text-xs font-bold uppercase tracking-wider text-accent"
        >
          Project Description
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          defaultValue={defaultMessage}
          placeholder="Tell us about the project — scope, objectives, reference videos, or key deliverables..."
          className="mt-2 w-full rounded-xl border border-white/10 bg-surface p-4 font-body text-sm text-white placeholder:text-white/40 outline-none transition-colors focus:border-accent"
        />
      </div>

      {TURNSTILE_SITE_KEY && (
        <>
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
          <div className="cf-turnstile" data-sitekey={TURNSTILE_SITE_KEY} data-theme="dark" />
        </>
      )}

      {state.status === "error" && (
        <p className="text-sm font-semibold text-red-400">
          {state.message}
          {state.whatsAppUrl && (
            <>
              {" "}
              <a href={state.whatsAppUrl} target="_blank" rel="noopener noreferrer" className="underline">
                Send it on WhatsApp
              </a>
            </>
          )}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 font-body text-xs font-semibold uppercase tracking-wider text-black transition-all hover:bg-accent-hover hover:scale-105 disabled:opacity-60 cursor-pointer"
      >
        {isPending ? "Sending Inquiry…" : "Start a Project"}
        <span className="link-arrow text-sm">→</span>
      </button>
      <p className="font-body text-xs text-text-muted">
        Submitting opens WhatsApp with your details filled in. Just tap send.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="font-body text-xs font-bold uppercase tracking-wider text-accent"
      >
        {label} {required && <span className="text-accent">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full rounded-xl border border-white/10 bg-surface p-3.5 font-body text-sm text-white placeholder:text-white/40 outline-none transition-colors focus:border-accent"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: Option[];
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="font-body text-xs font-bold uppercase tracking-wider text-accent"
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        defaultValue=""
        className="mt-2 w-full rounded-xl border border-white/10 bg-surface p-3.5 font-body text-sm text-white outline-none transition-colors focus:border-accent"
      >
        <option value="" disabled className="bg-surface text-white/50">
          Select option…
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-surface text-white">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
