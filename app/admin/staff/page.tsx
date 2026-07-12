import { Users } from "lucide-react";
import { getCurrentProfile } from "@/lib/supabase/server";
import ForbiddenAdminPage from "../forbidden";
import ComingSoonModule from "../module-placeholder";
import ProtectedAdminPage from "../protected-page";

export const dynamic = "force-dynamic";

export default async function AdminStaffPage() {
  const { profile } = await getCurrentProfile();

  if (profile?.role !== "admin") {
    return (
      <ProtectedAdminPage>
        <ForbiddenAdminPage />
      </ProtectedAdminPage>
    );
  }

  return (
    <ProtectedAdminPage>
    <ComingSoonModule
      icon={Users}
      title="עובדים והרשאות"
      description="ניהול עובדים, roles והרשאות מתקדמות יתווספו על בסיס Supabase Auth ו-profiles."
    />
    </ProtectedAdminPage>
  );
}
