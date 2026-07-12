import { Settings } from "lucide-react";
import { getCurrentProfile } from "@/lib/supabase/server";
import ForbiddenAdminPage from "../forbidden";
import ComingSoonModule from "../module-placeholder";
import ProtectedAdminPage from "../protected-page";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
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
      icon={Settings}
      title="הגדרות"
      description="הגדרות מערכת, מסלולי שירות והתאמות תפעוליות יישמרו כאן בהמשך."
    />
    </ProtectedAdminPage>
  );
}
