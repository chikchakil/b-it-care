import { BarChart3 } from "lucide-react";
import { getCurrentProfile } from "@/lib/supabase/server";
import ForbiddenAdminPage from "../forbidden";
import ComingSoonModule from "../module-placeholder";
import ProtectedAdminPage from "../protected-page";

export const dynamic = "force-dynamic";

export default async function AdminFinancePage() {
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
      icon={BarChart3}
      title="הכנסות והוצאות"
      description="דוחות פיננסיים, הוצאות לפי קטגוריה ורווח משוער ייבנו מעל תשלומים והוצאות."
    />
    </ProtectedAdminPage>
  );
}
