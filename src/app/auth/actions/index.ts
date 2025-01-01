"use server";

import {
  createSupabaseServerClient,
  createSupabaseAdmin,
  createSupabaseForResetPassword,
  createSupabaseServerClientReadOnly,
} from "@/lib/supabase";
import { render } from "@react-email/components";
import { AuthError } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import nodemailer from "nodemailer";
import ForgotPasswordEmail from "./forgot-password-email";
import generator from "generate-password";
import ForgotPasswordEmailV2 from "./forgot-password-email-v2";

/**
 * change password of the account by provided email with random generated password directly
 * then send the forgot password email with the password
 *
 * @param data
 * @returns
 */
export async function forgotPasswordV2(data: {
  email: string;
  redirectTo: string;
}) {
  const supabaseAdmin = await createSupabaseAdmin();

  const user = await supabaseAdmin
    .from("user")
    .select("id")
    .eq("email", data.email);

  console.log(user);

  if (!user.data?.length) {
    return JSON.stringify({ rejected: [] });
  }

  const generatedPassword = generator.generate({
    length: 10,
    numbers: true,
  });

  supabaseAdmin.auth.admin.updateUserById(user.data[0].id, {
    password: generatedPassword,
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
    ForgotPasswordEmailV2({
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
    subject: "Reset Your Password",
    html: emailHtml,
  };

  const sendMailRes = await transporter.sendMail(mailOptions);

  return JSON.stringify(sendMailRes);
}

export async function forgotPassword(data: {
  email: string;
  redirectTo: string;
}) {
  const supabaseAdmin = await createSupabaseAdmin();

  const generateLinkResult = await supabaseAdmin.auth.admin.generateLink({
    type: "recovery",
    email: data.email,
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
    ForgotPasswordEmail({
      appUrl: data.redirectTo,
      recoveryLink: `${data.redirectTo}/api/auth/verify?token=${token}&type=${type}&redirect_to=${data.redirectTo}/auth/update_password`,
    })
  );

  const mailOptions = {
    from: {
      name: process.env.SMTP_SENDER_NAME!,
      address: process.env.SMTP_USER!,
    },
    to: data.email,
    subject: "Reset Your Password",
    html: emailHtml,
  };

  const sendMailRes = await transporter.sendMail(mailOptions);

  return JSON.stringify(sendMailRes);
}

export async function signUpWithEmailAndPassword(data: {
  email: string;
  password: string;
  confirm: string;
  role: string;
  status: string;
}) {
  const supabaseServer = await createSupabaseServerClient();
  const createResult = await supabaseServer.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        role: data.role,
      },
    },
  });

  // TODO: use createSupabaseServerClient instead of createSupabaseAdmin.
  // supabaseServer.from

  // const supabaseAdmin = await createSupabaseAdmin();
  // const createResult = await supabaseAdmin.auth.admin.createUser({
  //   email: data.email,
  //   password: data.password,
  //   email_confirm: true,
  //   user_metadata: {
  //     role: data.role,
  //   },
  // });

  if (createResult.error?.message) {
    return JSON.stringify(createResult);
  }

  const name = data.email.split("@").at(0);

  const userResult = await supabaseServer
    .from("user")
    .insert({ name, id: createResult.data.user?.id });

  if (userResult.error?.message) {
    return JSON.stringify(userResult);
  }

  const permissionResult = await supabaseServer.from("permission").insert({
    role: data.role,
    status: data.status,
    user_id: createResult.data.user?.id,
    created_by: createResult.data.user?.id,
  });

  return JSON.stringify(permissionResult);
}

export async function signInWithEmailAndPassword(data: {
  email: string;
  password: string;
}) {
  const supabase = await createSupabaseServerClient();
  const result = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  return JSON.stringify(result);
}

// export async function resetPassword(data: { email: string }) {
//   const supabase = await createSupabaseServerClient();
//   const result = await supabase.auth.resetPasswordForEmail(data.email, {
//     redirectTo: "http://localhost:3000/auth/update_password",
//   });

//   return JSON.stringify(result);
// }

export async function updatePassword(data: { password: string; code: string }) {
  const newPassword = data.password;
  const code = data.code;
  const supabase = await createSupabaseForResetPassword();

  const { data: userData } = await supabase.auth.getUser();
  const { data: session } = await supabase.auth.getSession();

  console.log("userData", userData);
  console.log("session", session);

  const result: any = {
    data: null,
    error: null,
  };

  // if (!code) {
  //   result.error = {
  //     message: "Please request reset password link from 'Forgot Password' page",
  //   };

  //   return JSON.stringify(result);
  // }

  // console.log("code", code);
  // const { error: codeError } = await supabase.auth.exchangeCodeForSession(
  //   "b05f21ae-5f92-4aeb-bba6-5c2227902acb"
  // );

  // if (codeError) {
  //   result.error = {
  //     message: "Reset password link error",
  //   };

  //   return JSON.stringify(result);
  // }

  // const { data: updateUserData, error: updateUserError } =
  //   await supabase.auth.updateUser({
  //     password: newPassword,
  //   });

  // result.data = updateUserData;
  // result.error = updateUserError;

  // const updatedUser = await supabase.auth.updateUser({} data.code, { password: password.trim() })

  // supabase.auth.onAuthStateChange(async (event, session) => {
  //   console.log("event", event);
  //   console.log("session", session);

  //   if (event == "PASSWORD_RECOVERY") {

  //     result = { data, error };
  //   }
  // });

  return JSON.stringify(result);
}

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/auth");
}
