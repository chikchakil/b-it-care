import { Bell } from "lucide-react";
import ComingSoonModule from "../module-placeholder";
import ProtectedAdminPage from "../protected-page";

export const dynamic = "force-dynamic";

export default function AdminTasksPage() {
  return (
    <ProtectedAdminPage>
    <ComingSoonModule
      icon={Bell}
      title="משימות"
      description="ניהול משימות, אחראים, דחיפות, תאריכי יעד וסינון לפי לקוח יתווספו בשלב הבא."
    />
    </ProtectedAdminPage>
  );
}
