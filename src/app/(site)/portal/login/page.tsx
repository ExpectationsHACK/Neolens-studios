import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { PortalLoginForm } from "@/components/PortalLoginForm";
import { getPortalUser } from "@/lib/portal";

export const metadata: Metadata = {
  title: "Client Login",
  robots: { index: false, follow: false },
};

export default async function PortalLoginPage() {
  const user = await getPortalUser();
  if (user) redirect("/portal");

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-20">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">Client Portal</p>
      <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-text">
        Sign in
      </h1>
      <p className="mt-2 text-sm text-text-muted">
        Track your project status and download deliverables. Don&apos;t have a
        login yet? Ask your Neo Lens Studios producer to set one up.
      </p>
      <div className="mt-8">
        <PortalLoginForm />
      </div>
    </div>
  );
}
