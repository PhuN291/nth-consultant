import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db, pool } from "./db";
import path from "path";

async function main() {
  console.log("Running migrations...");
  await migrate(db, {
    migrationsFolder: path.resolve(__dirname, "../migrations"),
  });
  console.log("Migrations complete.");
  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
