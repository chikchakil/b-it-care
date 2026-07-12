import { redirect } from "next/navigation";
import { getCurrentProfile } from "@/lib/supabase/server";
import AdminShell from "./shell";

export default async function ProtectedAdminPage({
  children
}: {
  children: React.ReactNode;
}) {
  const { profile, isConfigured } = await getCurrentProfile();

  if (!isConfigured || !profile) {
    redirect("/admin/login");
  }

  return <AdminShell profile={profile}>{children}</AdminShell>;
}
