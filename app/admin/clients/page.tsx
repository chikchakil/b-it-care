import { BriefcaseBusiness } from "lucide-react";
import ComingSoonModule from "../module-placeholder";
import ProtectedAdminPage from "../protected-page";

export const dynamic = "force-dynamic";

export default function AdminClientsPage() {
  return (
    <ProtectedAdminPage>
    <ComingSoonModule
      icon={BriefcaseBusiness}
      title="לקוחות"
      description="תיקי לקוח, סטטוסים, מסלולי שירות, הערות והיסטוריית טיפול יתווספו כאן על אותה תשתית הרשאות."
    />
    </ProtectedAdminPage>
  );
}
