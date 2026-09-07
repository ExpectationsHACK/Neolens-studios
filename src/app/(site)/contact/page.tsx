import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { ContactForm } from "@/components/ContactForm";
import { CONTACT_EMAIL, CONTACT_PHONE, STUDIO_ADDRESS } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with Neo Lens Studios — tell us about your project type, budget and timeline.",
};

type Props = { searchParams: Promise<{ project?: string }> };

export default async function ContactPage({ searchParams }: Props) {
  const { project } = await searchParams;
  const defaultMessage = project ? `Hi — I'd like something similar to "${project}". ` : undefined;

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <div className="grid gap-16 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <SectionHeading eyebrow="Contact" title="Let's talk today" />
          <p className="mt-6 text-text-muted">
            Tell us about your project — type, budget and timeline — and
            we&apos;ll get back to you within two working days.
          </p>
          <div className="mt-10 space-y-4 font-mono text-sm">
            <div>
              <p className="text-[11px] uppercase tracking-widest text-accent">Email</p>
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-text hover:text-accent">
                {CONTACT_EMAIL}
              </a>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-widest text-accent">Phone</p>
              <a
                href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
                className="text-text hover:text-accent"
              >
                {CONTACT_PHONE}
              </a>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-widest text-accent">Studio</p>
              <p className="text-text">{STUDIO_ADDRESS}</p>
            </div>
          </div>

          {process.env.NEXT_PUBLIC_CAL_LINK && (
            <div className="mt-10 border-t border-border pt-6">
              <p className="text-sm text-text-muted">
                Prefer to talk it through first?
              </p>
              <a
                href={process.env.NEXT_PUBLIC_CAL_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block rounded-full border border-accent/50 px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-accent hover:bg-accent hover:text-base"
              >
                Book a call instead →
              </a>
            </div>
          )}
        </div>
        <ContactForm defaultMessage={defaultMessage} />
      </div>
    </div>
  );
}
