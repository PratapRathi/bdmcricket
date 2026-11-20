import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import { seedSiteData } from "./seed-data";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is required to seed the database.");

const db = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });

void (async () => {
  try {
    await seedSiteData(db);
    console.log("Database content seeded. Existing records were preserved.");
  } finally {
    await db.$disconnect();
  }
})();
