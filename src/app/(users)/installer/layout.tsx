import readUserSession from "@/lib/actions";
import SideNav from "./components/side-nav";
import { redirect } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import {
  createSupabaseServerClient,
  createSupabaseServerClientReadOnly,
} from "@/lib/supabase";
import { Layout } from "./_components/layout/layout";

export default async function InstallerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await readUserSession();

  if (!data.session) {
    return redirect("/auth");
  }

  if (data.session.user.user_metadata?.role !== "installer") {
    return redirect("/unauthorized");
  }

  return <Layout>{children}</Layout>;
}
