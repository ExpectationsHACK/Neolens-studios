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

      {state.status === "error" && <p className="text-sm font-semibold text-red-400">{state.message}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 font-body text-xs font-semibold uppercase tracking-wider text-black transition-all hover:bg-accent-hover hover:scale-105 disabled:opacity-60 cursor-pointer"
      >
        {isPending ? "Sending Inquiry…" : "Start a Project"}
        <span className="text-sm">→</span>
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
  options: { value: string; label: string }[];
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
