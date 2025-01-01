import readUserSession from "@/lib/actions";
import { redirect } from "next/navigation";
import React from "react";
import SignOut from "./components/sign-out";

export default async function UserPage() {
  return redirect("/user/dashboard");
}
