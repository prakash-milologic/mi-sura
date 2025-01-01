"use server";

import InviteUserEmail from "@/components/email_template/invite-user-email";
import readUserSession from "@/lib/actions";
import {
  createSupabaseAdmin,
  createSupabaseServerClientReadOnly,
} from "@/lib/supabase";
import { render } from "@react-email/components";
import { revalidatePath, unstable_noStore } from "next/cache";
import nodemailer from "nodemailer";
import generator from "generate-password";
import InviteUserEmailV2 from "@/components/email_template/invite-user-email-v2";

/**
 * signup user directly then send email with random password generated
 *
 * @param data
 * @returns
 */
export async function inviteUserV2(data: {
  email: string;
  password: string;
  name: string;
  role: string;
  status: string;
  confirm: string;
  redirectTo: string;
}) {
  const supabase = await createSupabaseServerClientReadOnly();
  const status = "active";
  const generatedPassword = generator.generate({
    length: 10,
    numbers: true,
  });

  const createResult = await supabase.auth.signUp({
    email: data.email,
    password: generatedPassword,
    options: {
      data: {
        role: data.role,
      },
    },
  });

  if (createResult.error?.message) {
    return JSON.stringify(createResult);
  }

  const userResult = await supabase.from("user").insert({
    email: data.email,
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
    status,
    user_id: createResult.data.user?.id,
    created_by: authUserId,
  });

  const transporter = nodemailer.createTransport({
    port: process.env.SMTP_PORT,
    logger: true,
    debug: true,
    secureConnection: false,
    tls: {
      rejectUnauthorized: false,
    },
    host: process.env.SMTP_HOST,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  } as any);

  const emailHtml = await render(
    InviteUserEmailV2({
      appUrl: data.redirectTo,
      generatedPassword,
    })
  );

  const mailOptions = {
    from: {
      name: process.env.SMTP_SENDER_NAME!,
      address: process.env.SMTP_USER!,
    },
    to: data.email,
    subject: "You have been invited",
    html: emailHtml,
  };

  await transporter.sendMail(mailOptions);

  revalidatePath("/installer/accounts"); // modify based on the path used
  return JSON.stringify(permissionResult);
}

export async function inviteUser(data: {
  email: string;
  password: string;
  name: string;
  role: string;
  status: string;
  confirm: string;
  redirectTo: string;
}) {
  const supabase = await createSupabaseServerClientReadOnly();
  const authUser = await supabase.auth.getUser();
  const authUserId = authUser.data.user?.id;

  const supabaseAdmin = await createSupabaseAdmin();

  const generateLinkResult = await supabaseAdmin.auth.admin.generateLink({
    type: "invite",
    email: data.email,
    options: {
      data: {
        role: data.role,
      },
    },
  });

  // console.log(generateLinkResult);

  if (generateLinkResult.error?.message) {
    return JSON.stringify(generateLinkResult);
  }

  // Create a new URL object
  const parsedUrl = new URL(generateLinkResult.data.properties?.action_link!);

  // Get the search parameters
  const params = new URLSearchParams(parsedUrl.search);

  // Extract the parameters
  const token = params.get("token");
  const type = params.get("type");

  const transporter = nodemailer.createTransport({
    port: process.env.SMTP_PORT,
    logger: true,
    debug: true,
    secureConnection: false,
    tls: {
      rejectUnauthorized: false,
    },
    host: process.env.SMTP_HOST,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  } as any);

  const emailHtml = await render(
    InviteUserEmail({
      appUrl: data.redirectTo,
      inviteLink: `${data.redirectTo}/api/auth/verify?token=${token}&type=${type}&redirect_to=${data.redirectTo}/auth/update_password`,
    })
  );

  const mailOptions = {
    from: {
      name: process.env.SMTP_SENDER_NAME!,
      address: process.env.SMTP_USER!,
    },
    to: data.email,
    subject: "You have been invited",
    html: emailHtml,
  };

  await transporter.sendMail(mailOptions);

  // const supabase = await createSupabaseAdmin();
  // const createResult = await supabaseAdmin.auth.admin.inviteUserByEmail(
  //   data.email,
  //   {
  //     data: {
  //       role: data.role,
  //     },
  //     redirectTo: data.redirectTo,
  //   }
  // );

  const userResult = await supabaseAdmin.from("user").insert({
    name: data.name,
    email: data.email,
    id: generateLinkResult.data.user?.id,
  });

  if (userResult.error?.message) {
    return JSON.stringify(userResult);
  }

  // const authUser = await supabase.auth.getUser();
  // const authUserId = authUser.data.user?.id;

  const permissionResult = await supabaseAdmin.from("permission").insert({
    role: data.role,
    status: data.status,
    user_id: generateLinkResult.data.user?.id,
    created_by: authUserId,
  });

  revalidatePath("/installer/accounts"); // modify based on the path used
  return JSON.stringify(permissionResult);
}

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
    email: data.email,
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

  revalidatePath("/installer/accounts"); // modify based on the path used
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
    .or(`user_id.eq.${authUserId},created_by.eq.${authUserId}`)
    .order("created_at", {
      ascending: true,
    }); // modify based on the related access rule
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

  revalidatePath("/installer/accounts"); // modify based on the path used
  return JSON.stringify(userResult);
}

export async function deleteAccount(id: string) {
  const supabase = await createSupabaseAdmin();
  const deleteResult = await supabase.auth.admin.deleteUser(id);
  revalidatePath("/installer/accounts"); // modify based on the path used
  return JSON.stringify(deleteResult);
}

export async function bulkDeleteAccount(ids: string[]) {
  const supabase = await createSupabaseServerClientReadOnly();
  const auth = await supabase.rpc("bulk_delete_users", { ids });
  return auth;
}
