"use server";

import readUserSession from "@/lib/actions";
import {
  createSupabaseAdmin,
  createSupabaseServerClientReadOnly,
} from "@/lib/supabase";
import { revalidatePath, unstable_noStore } from "next/cache";

export async function createAccount(data: {
  email: string;
  password: string;
  name: string;
  role: string;
  status: string;
  confirm: string;
}) {
  const supabase = await createSupabaseServerClientReadOnly();

  // const supabase = await createSupabaseAdmin();
  const createResult = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        role: data.role,
      },
    },
  });

  // const createResult = await supabase.auth.admin.createUser({
  //   email: data.email,
  //   password: data.password,
  //   email_confirm: true,
  //   user_metadata: {
  //     role: data.role,
  //   },
  // });

  console.log(createResult);

  if (createResult.error?.message) {
    return JSON.stringify(createResult);
  }

  const userResult = await supabase.from("user").insert({
    name: data.name,
    id: createResult.data.user?.id,
  });

  if (userResult.error?.message) {
    return JSON.stringify(userResult);
  }

  const authUser = await supabase.auth.getUser();
  const authUserId = authUser.data.user?.id;

  const permissionResult = await supabase.from("permission").insert({
    role: data.role,
    status: data.status,
    user_id: createResult.data.user?.id,
    created_by: authUserId,
  });

  revalidatePath("/user/accounts"); // modify based on the path used
  return JSON.stringify(permissionResult);
}

export async function readAccounts() {
  unstable_noStore();
  const supabase = await createSupabaseServerClientReadOnly();
  const authUser = await supabase.auth.getUser();
  const authUserId = authUser.data.user?.id;
  return await supabase
    .from("permission")
    .select("*, user(*)")
    .or(`user_id.eq.${authUserId},created_by.eq.${authUserId}`); // modify based on the related access rule
}

export async function changePassword(
  currentPassword: string,
  newPassword: string
) {
  const supabase = await createSupabaseServerClientReadOnly();

  const updateUserResult = await supabase.rpc("change_user_password", {
    current_plain_password: currentPassword,
    new_plain_password: newPassword,
  });

  return JSON.stringify(updateUserResult);
}

export async function editAccount(
  id: string,
  data: {
    name: string;
    role: "super-admin" | "admin" | "installer" | "user";
  }
) {
  const supabase = await createSupabaseServerClientReadOnly();

  const permissionResult = await supabase
    .from("permission")
    .update({ role: data.role })
    .eq("user_id", id);

  if (permissionResult.error?.message) {
    return JSON.stringify(permissionResult);
  }

  const userResult = await supabase
    .from("user")
    .update({ name: data.name })
    .eq("id", id);

  revalidatePath("/user/accounts"); // modify based on the path used
  return JSON.stringify(userResult);
}

export async function deleteAccount(id: string) {
  const supabase = await createSupabaseAdmin();
  const deleteResult = await supabase.auth.admin.deleteUser(id);
  revalidatePath("/user/accounts"); // modify based on the path used
  return JSON.stringify(deleteResult);
}
