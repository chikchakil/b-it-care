import { CreditCard } from "lucide-react";
import { getCurrentProfile } from "@/lib/supabase/server";
import ForbiddenAdminPage from "../forbidden";
import ComingSoonModule from "../module-placeholder";
import ProtectedAdminPage from "../protected-page";

export const dynamic = "force-dynamic";

export default async function AdminPaymentsPage() {
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
      icon={CreditCard}
      title="תשלומים"
      description="תשלומים, סטטוסים, חיובים חודשיים ואמצעי תשלום יהיו זמינים למשתמשי Admin בלבד."
    />
    </ProtectedAdminPage>
  );
}
