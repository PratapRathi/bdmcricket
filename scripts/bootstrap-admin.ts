import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import { hashPassword } from "../lib/admin-auth/password";

async function main() {
  const username = process.env.ADMIN_BOOTSTRAP_USERNAME?.trim().toLowerCase();
  const password = process.env.ADMIN_BOOTSTRAP_PASSWORD;
  const connectionString = process.env.DATABASE_URL;
  const sessionSecret = process.env.ADMIN_SESSION_SECRET;

  if (!connectionString) throw new Error("DATABASE_URL is required to create the initial admin account.");
  if (!sessionSecret || Buffer.byteLength(sessionSecret) < 32) throw new Error("Set ADMIN_SESSION_SECRET to a random value of at least 32 bytes.");
  if (!username || username.length < 3 || username.length > 64) throw new Error("ADMIN_BOOTSTRAP_USERNAME must be between 3 and 64 characters.");
  if (!password || password.length < 14 || password.length > 128) throw new Error("ADMIN_BOOTSTRAP_PASSWORD must be between 14 and 128 characters.");

  const database = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });
  try {
    if (await database.adminUser.count()) {
      throw new Error("An admin already exists. Use the admin Settings page to update credentials.");
    }
    await database.adminUser.create({ data: { username, passwordHash: await hashPassword(password) } });
    console.log("Initial admin account created. Remove ADMIN_BOOTSTRAP_PASSWORD from the environment now.");
  } finally {
    await database.$disconnect();
  }
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : "Unexpected bootstrap error";
  console.error(`Admin bootstrap failed: ${message}`);
  process.exitCode = 1;
});
