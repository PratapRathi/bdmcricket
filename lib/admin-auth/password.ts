import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";

const KEY_LENGTH = 64;
const SCRYPT_OPTIONS = { N: 16_384, r: 8, p: 1, maxmem: 64 * 1024 * 1024 };
const DUMMY_SALT = Buffer.alloc(16, 39);
export const DUMMY_PASSWORD_HASH = `scrypt$16384$8$1$${DUMMY_SALT.toString("base64url")}$${Buffer.alloc(KEY_LENGTH).toString("base64url")}`;

function derive(password: string, salt: Buffer, options = SCRYPT_OPTIONS) {
  return new Promise<Buffer>((resolve, reject) => {
    scryptCallback(password, salt, KEY_LENGTH, options, (error, key) => {
      if (error) reject(error);
      else resolve(key as Buffer);
    });
  });
}

export async function hashPassword(password: string) {
  const salt = randomBytes(16);
  const key = await derive(password, salt);
  return `scrypt$16384$8$1$${salt.toString("base64url")}$${key.toString("base64url")}`;
}

export async function verifyPassword(password: string, storedHash: string) {
  const parts = storedHash.split("$");
  const validParameters = parts.length === 6 && parts[0] === "scrypt" && parts[1] === "16384" && parts[2] === "8" && parts[3] === "1";
  const salt = validParameters ? Buffer.from(parts[4], "base64url") : DUMMY_SALT;
  const expected = validParameters ? Buffer.from(parts[5], "base64url") : Buffer.alloc(KEY_LENGTH);
  if (salt.length !== 16 || expected.length !== KEY_LENGTH) return false;

  const actual = await derive(password, salt);
  return timingSafeEqual(actual, expected) && validParameters;
}
