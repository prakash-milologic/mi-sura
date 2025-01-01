import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
import fs from "fs";

if (fs.existsSync(".env.local")) {
  dotenv.config({ path: ".env.local" });
} else {
  dotenv.config({ path: ".env" });
}

if (!process.env.DATABASE_URL) {
  console.log("Cannot find database url");
}

export default {
  schema: "./src/db/schema/*",
  out: "./src/db/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL as string,
  },
} satisfies Config;
