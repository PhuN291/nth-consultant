import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@shared/schema";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL is not set. Add it to .env",
  );
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Neon yêu cầu SSL — connection string đã có sslmode=require
  ssl: process.env.DATABASE_URL.includes("sslmode=") ? undefined : { rejectUnauthorized: false },
  max: 10,
});

export const db = drizzle(pool, { schema });
