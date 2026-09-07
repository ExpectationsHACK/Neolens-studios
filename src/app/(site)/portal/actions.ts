"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getCachedPayload } from "@/lib/payload";
import { PORTAL_TOKEN_COOKIE } from "@/lib/portal";

export type PortalLoginState = { status: "idle" | "error"; message?: string };

export async function portalLogin(
  _prevState: PortalLoginState,
  formData: FormData,
): Promise<PortalLoginState> {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    return { status: "error", message: "Enter your email and password." };
  }

  let token: string | undefined;
  let exp: number | undefined;

  try {
    const payload = await getCachedPayload();
    const result = await payload.login({
      collection: "client-accounts",
      data: { email, password },
    });
    token = result.token;
    exp = result.exp;
  } catch (error) {
    console.error("[portal] login failed:", error);
    return { status: "error", message: "Incorrect email or password." };
  }

  if (!token) {
    return { status: "error", message: "Incorrect email or password." };
  }

  (await cookies()).set(PORTAL_TOKEN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: exp ? new Date(exp * 1000) : undefined,
  });

  redirect("/portal");
}

export async function portalLogout() {
  (await cookies()).delete(PORTAL_TOKEN_COOKIE);
  redirect("/portal/login");
}
