import { createSupabaseServerClient, getCurrentProfile } from "@/lib/supabase/server";
import { leadStatusLabels, type Lead, type LeadStatus } from "@/lib/supabase/types";
import LeadsBoard from "./leads-board";
import ProtectedAdminPage from "../protected-page";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage({
  searchParams
}: {
  searchParams: Promise<{ status?: string; open?: string }>;
}) {
  const params = await searchParams;
  const { profile } = await getCurrentProfile();
  const supabase = await createSupabaseServerClient();
  let leads: Lead[] = [];

  if (supabase) {
    let query = supabase.from("leads").select("*").order("created_at", { ascending: false });

    if (params.status && params.status in leadStatusLabels) {
      query = query.eq("status", params.status as LeadStatus);
    }

    const { data } = await query;
    leads = data ?? [];
  }

  return (
    <ProtectedAdminPage>
      <LeadsBoard leads={leads} role={profile?.role ?? "staff"} openLeadId={params.open} />
    </ProtectedAdminPage>
  );
}
