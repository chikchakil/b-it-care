import Link from "next/link";
import { ArrowLeft, BarChart3, BriefcaseBusiness, ClipboardList, CreditCard, TrendingUp } from "lucide-react";
import { createSupabaseServerClient, getCurrentProfile } from "@/lib/supabase/server";
import type { Lead } from "@/lib/supabase/types";
import AdminDashboardRealtime from "./realtime-dashboard";
import ProtectedAdminPage from "./protected-page";

export const dynamic = "force-dynamic";

function getMonthStart() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
}

export default async function AdminDashboardPage() {
  const { profile } = await getCurrentProfile();
  const supabase = await createSupabaseServerClient();
  const monthStart = getMonthStart();

  let leads: Lead[] = [];

  if (supabase) {
    const { data } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(8);
    leads = data ?? [];
  }

  const newLeads = leads.filter((lead) => lead.status === "new").length;
  const activePipeline = leads.filter((lead) =>
    ["contacted", "call_scheduled", "proposal_pending"].includes(lead.status)
  ).length;
  const monthlyLeads = leads.filter((lead) => lead.created_at >= monthStart).length;

  const cards = [
    { label: "בקשות חדשות מהאתר", value: newLeads, href: "/admin/leads?status=new", icon: ClipboardList },
    { label: "משימות פתוחות", value: 0, href: "/admin/tasks", icon: TrendingUp },
    { label: "לקוחות בטיפול", value: activePipeline, href: "/admin/clients?status=in_progress", icon: BriefcaseBusiness },
    { label: "לקוחות פעילים", value: 0, href: "/admin/clients?status=active", icon: BriefcaseBusiness },
    { label: "תשלומים ממתינים", value: profile?.role === "admin" ? 0 : "מוגבל", href: "/admin/payments?status=pending", icon: CreditCard },
    { label: "הכנסות החודש", value: profile?.role === "admin" ? "₪0" : "מוגבל", href: "/admin/finance", icon: BarChart3 },
    { label: "הוצאות החודש", value: profile?.role === "admin" ? "₪0" : "מוגבל", href: "/admin/finance?tab=expenses", icon: BarChart3 },
    { label: "רווח משוער", value: profile?.role === "admin" ? "₪0" : "מוגבל", href: "/admin/finance", icon: TrendingUp }
  ];

  return (
    <ProtectedAdminPage>
    <div className="grid gap-6">
      <section className="glass-edge rounded-lg border border-white/12 bg-white/[0.055] p-5 shadow-[0_24px_90px_rgba(53,129,255,.16)] backdrop-blur-2xl">
        <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold text-blue-200">Live dashboard</p>
            <h2 className="mt-2 text-3xl font-black sm:text-5xl">תמונה עסקית בזמן אמת</h2>
            <p className="mt-4 max-w-2xl leading-8 text-slate-300">
              בקשות מהאתר, טיפול, לקוחות ופיננסים במקום אחד, בלי לחשוף שום דבר באתר הציבורי.
            </p>
          </div>
          <AdminDashboardRealtime initialCount={leads.length} />
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card, index) => {
          const Icon = card.icon;
          const disabled = card.value === "מוגבל";
          const content = (
            <div className="glass-edge group h-full rounded-lg border border-white/10 bg-white/[0.055] p-5 transition hover:-translate-y-1 hover:border-blue-200/35 hover:bg-white/[0.08] hover:shadow-glow">
              <div className="relative z-10 flex h-full flex-col justify-between gap-6">
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-md bg-white/10 text-blue-200">
                    <Icon className="h-6 w-6 transition group-hover:scale-110" />
                  </span>
                  <span className="text-xs text-slate-500">0{index + 1}</span>
                </div>
                <div>
                  <p className="text-sm text-slate-400">{card.label}</p>
                  <p className="mt-2 text-3xl font-black">{card.value}</p>
                  <p className="mt-4 flex items-center gap-2 text-sm text-blue-100">
                    פתיחה
                    <ArrowLeft className="h-4 w-4" />
                  </p>
                </div>
              </div>
            </div>
          );

          return disabled ? (
            <div key={card.label} className="opacity-60">
              {content}
            </div>
          ) : (
            <Link key={card.label} href={card.href}>
              {content}
            </Link>
          );
        })}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.25fr_.75fr]">
        <div className="rounded-lg border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-blue-200">בקשות אחרונות</p>
              <h3 className="mt-1 text-2xl font-black">Leads נכנסים</h3>
            </div>
            <Link href="/admin/leads" className="text-sm text-blue-100 transition hover:text-white">
              לכל הבקשות
            </Link>
          </div>
          <div className="grid gap-3">
            {leads.length ? (
              leads.slice(0, 5).map((lead) => (
                <Link
                  key={lead.id}
                  href={`/admin/leads?open=${lead.id}`}
                  className="rounded-lg border border-white/10 bg-[#071426]/72 p-4 transition hover:border-blue-200/35 hover:bg-[#0a1b32]"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-bold">{lead.full_name}</p>
                      <p className="mt-1 text-sm text-slate-400">{lead.business_name}</p>
                    </div>
                    <p className="text-sm text-blue-100">{lead.phone}</p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="rounded-lg border border-white/10 bg-white/[0.04] p-6 text-center text-slate-400">
                עדיין אין בקשות מהאתר.
              </div>
            )}
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl">
          <p className="text-sm font-semibold text-blue-200">Pipeline</p>
          <h3 className="mt-1 text-2xl font-black">מדדים מהירים</h3>
          <div className="mt-6 grid gap-3">
            {[
              ["חדשים החודש", monthlyLeads],
              ["בטיפול", activePipeline],
              ["הומרו ללקוח", leads.filter((lead) => lead.status === "converted").length]
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between rounded-lg bg-white/[0.055] p-4">
                <span className="text-slate-300">{label}</span>
                <span className="text-xl font-black">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
    </ProtectedAdminPage>
  );
}
