import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as dotenv from "dotenv";
import fs from "fs";
import { createSupabaseAdmin } from "../lib/supabase/index";

if (fs.existsSync(".env.local")) {
  dotenv.config({ path: ".env.local" });
} else {
  dotenv.config({ path: ".env" });
}

if (!process.env.DATABASE_URL) {
  console.log("Cannot find database url");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

async function seedDefaultSuperAdmin() {
  const email = "super@gmail.com";
  const password = "123123";
  const user_metadata = { role: "super-admin" };
  const status = "active";

  const supabaseAdmin = await createSupabaseAdmin();
  const createUser = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    user_metadata,
    email_confirm: true,
  });

  if (createUser.error) throw new Error(createUser.error.message);

  const insertUser = await supabaseAdmin.from("user").insert({
    id: createUser.data.user?.id,
    name: createUser.data.user.email?.split("@").at(0),
    email: createUser.data.user.email,
  });

  if (insertUser.error) throw new Error(insertUser.error.message);

  const insertPermission = await supabaseAdmin.from("permission").insert({
    role: user_metadata.role,
    status,
    user_id: createUser.data.user?.id,
    created_by: createUser.data.user?.id,
  });

  if (insertPermission.error) throw new Error(insertPermission.error.message);

  console.log("Default Super Admin", insertPermission.statusText);
}

async function main() {
  console.log("seeding started!");
  await seedDefaultSuperAdmin();
  console.log("seeding finished!");
  process.exit(0);
}

main()
  .then()
  .catch((err) => {
    console.error(err);
    process.exit(0);
  });
