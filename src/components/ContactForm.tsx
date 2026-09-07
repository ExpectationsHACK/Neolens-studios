"use client";

import { useActionState } from "react";
import Script from "next/script";
import { submitLead, type ContactFormState } from "@/app/(site)/contact/actions";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const initialState: ContactFormState = { status: "idle" };

const PROJECT_TYPES = [
  { value: "documentary", label: "Documentary" },
  { value: "commercial", label: "Commercial" },
  { value: "corporate", label: "Corporate Video" },
  { value: "live-production", label: "Live Production" },
  { value: "brand-content", label: "Brand Content" },
  { value: "video-podcast", label: "Video Podcast" },
  { value: "other", label: "Other" },
];

const BUDGET_BANDS = [
  { value: "under-1m", label: "Under ₦1,000,000" },
  { value: "1m-5m", label: "₦1,000,000 – ₦5,000,000" },
  { value: "5m-15m", label: "₦5,000,000 – ₦15,000,000" },
  { value: "above-15m", label: "Above ₦15,000,000" },
  { value: "not-sure", label: "Not sure yet" },
];

const TIMELINES = [
  { value: "asap", label: "ASAP" },
  { value: "1-month", label: "Within 1 month" },
  { value: "1-3-months", label: "1–3 months" },
  { value: "exploring", label: "Just exploring" },
];

export function ContactForm({ defaultMessage }: { defaultMessage?: string }) {
  const [state, formAction, isPending] = useActionState(submitLead, initialState);

  if (state.status === "success") {
    return (
      <div className="border border-accent/40 bg-surface p-8 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">Sent</p>
        <p className="mt-2 text-text">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6">
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
        <Field label="Name" name="name" required />
        <Field label="Email" name="email" type="email" required />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Phone" name="phone" type="tel" />
        <SelectField label="Project type" name="projectType" options={PROJECT_TYPES} />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <SelectField label="Budget" name="budgetBand" options={BUDGET_BANDS} />
        <SelectField label="Timeline" name="timeline" options={TIMELINES} />
      </div>
      <div>
        <label
          htmlFor="message"
          className="font-mono text-[11px] uppercase tracking-widest text-text-muted"
        >
          Tell us about the project
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          defaultValue={defaultMessage}
          className="mt-2 w-full border border-border bg-base p-3 text-text outline-none focus:border-accent"
        />
      </div>

      {TURNSTILE_SITE_KEY && (
        <>
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
          <div className="cf-turnstile" data-sitekey={TURNSTILE_SITE_KEY} data-theme="dark" />
        </>
      )}

      {state.status === "error" && <p className="text-sm text-red-400">{state.message}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-full bg-accent px-8 py-3 font-mono text-xs uppercase tracking-widest text-base transition-colors hover:bg-accent-hover disabled:opacity-60"
      >
        {isPending ? "Sending…" : "Send inquiry"}
      </button>
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
        className="font-mono text-[11px] uppercase tracking-widest text-text-muted"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full border border-border bg-base p-3 text-text outline-none focus:border-accent"
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
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="font-mono text-[11px] uppercase tracking-widest text-text-muted"
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        defaultValue=""
        className="mt-2 w-full border border-border bg-base p-3 text-text outline-none focus:border-accent"
      >
        <option value="" disabled>
          Select…
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
