"use client";

import { useActionState } from "react";
import { portalLogin, type PortalLoginState } from "@/app/(site)/portal/actions";

const initialState: PortalLoginState = { status: "idle" };

export function PortalLoginForm() {
  const [state, formAction, isPending] = useActionState(portalLogin, initialState);

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label
          htmlFor="email"
          className="font-mono text-[11px] uppercase tracking-widest text-text-muted"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-2 w-full border border-border bg-base p-3 text-text outline-none focus:border-accent"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="font-mono text-[11px] uppercase tracking-widest text-text-muted"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="mt-2 w-full border border-border bg-base p-3 text-text outline-none focus:border-accent"
        />
      </div>

      {state.status === "error" && <p className="text-sm text-red-400">{state.message}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-full bg-accent px-8 py-3 font-mono text-xs uppercase tracking-widest text-base transition-colors hover:bg-accent-hover disabled:opacity-60"
      >
        {isPending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
