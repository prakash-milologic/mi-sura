"use server";

import { createSupabaseServerClientReadOnly } from "../supabase";

export default async function readUserSession() {
  const supabase = await createSupabaseServerClientReadOnly();
  return supabase.auth.getSession();
}
