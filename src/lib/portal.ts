import "server-only";
import { cookies } from "next/headers";
import { getCachedPayload } from "@/lib/payload";

export const PORTAL_TOKEN_COOKIE = "payload-token";

export type PortalUser = {
  id: string;
  email: string;
  name?: string | null;
  client: string;
  collection: string;
};

/** Resolves the logged-in client-portal user from the session cookie, or null. */
export async function getPortalUser(): Promise<PortalUser | null> {
  const token = (await cookies()).get(PORTAL_TOKEN_COOKIE)?.value;
  if (!token) return null;

  try {
    const payload = await getCachedPayload();
    const { user } = await payload.auth({
      headers: new Headers({ Authorization: `JWT ${token}` }),
    });
    if (!user || user.collection !== "client-accounts") return null;
    return user as unknown as PortalUser;
  } catch (error) {
    console.error("[portal] failed to resolve session:", error);
    return null;
  }
}
