import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

const COOKIE_NAME = "bdm_admin_session";
const SESSION_TTL_SECONDS = 8 * 60 * 60;

export type AdminIdentity = { id: string; username: string };
type SessionPayload = { sub: string; username: string; version: number; issuedAt: number; expiresAt: number };

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || Buffer.byteLength(secret) < 32) throw new Error("ADMIN_SESSION_SECRET must contain at least 32 bytes.");
  return secret;
}

function sign(payload: string) {
  return createHmac("sha256", getSecret()).update(payload).digest("base64url");
}

export function createAdminSessionToken(admin: AdminIdentity & { sessionVersion: number }) {
  const now = Math.floor(Date.now() / 1000);
  const payload: SessionPayload = {
    sub: admin.id,
    username: admin.username,
    version: admin.sessionVersion,
    issuedAt: now,
    expiresAt: now + SESSION_TTL_SECONDS,
  };
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${encoded}.${sign(encoded)}`;
}

function readSessionPayload(token: string): SessionPayload | null {
  const [encoded, signature, extra] = token.split(".");
  if (!encoded || !signature || extra || encoded.length > 2048) return null;

  try {
    const expected = Buffer.from(sign(encoded), "base64url");
    const supplied = Buffer.from(signature, "base64url");
    if (expected.length !== supplied.length || !timingSafeEqual(expected, supplied)) return null;
    const payload: unknown = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8"));
    if (!payload || typeof payload !== "object") return null;
    const session = payload as Partial<SessionPayload>;
    if (typeof session.sub !== "string" || typeof session.username !== "string" || typeof session.version !== "number" || typeof session.expiresAt !== "number") return null;
    if (session.expiresAt <= Math.floor(Date.now() / 1000)) return null;
    return session as SessionPayload;
  } catch {
    return null;
  }
}

export async function setAdminSession(admin: AdminIdentity & { sessionVersion: number }) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, createAdminSessionToken(admin), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
    priority: "high",
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, "", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: 0 });
}

export async function getAdminSession(): Promise<AdminIdentity | null> {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token) return null;

  const payload = readSessionPayload(token);
  if (!payload) return null;
  const admin = await prisma.adminUser.findUnique({
    where: { id: payload.sub },
    select: { id: true, username: true, sessionVersion: true, isActive: true },
  });
  if (!admin?.isActive || admin.sessionVersion !== payload.version || admin.username !== payload.username) return null;
  return { id: admin.id, username: admin.username };
}
