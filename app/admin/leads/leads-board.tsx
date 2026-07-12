"use client";

import { useMemo, useState, useTransition } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Search, SlidersHorizontal, UserPlus } from "lucide-react";
import type { Lead, LeadStatus, UserRole } from "@/lib/supabase/types";
import { leadStatusLabels } from "@/lib/supabase/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const statusOptions = Object.entries(leadStatusLabels) as [LeadStatus, string][];

export default function LeadsBoard({
  leads,
  role,
  openLeadId
}: {
  leads: Lead[];
  role: UserRole;
  openLeadId?: string;
}) {
  const [items, setItems] = useState(leads);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<LeadStatus | "all">("all");
  const [selectedLeadId, setSelectedLeadId] = useState(openLeadId ?? leads[0]?.id ?? "");
  const [toast, setToast] = useState("");
  const [isPending, startTransition] = useTransition();

  const filteredLeads = useMemo(() => {
    return items.filter((lead) => {
      const matchesStatus = status === "all" || lead.status === status;
      const searchable = `${lead.full_name} ${lead.phone} ${lead.email} ${lead.business_name} ${lead.message}`.toLowerCase();
      return matchesStatus && searchable.includes(query.toLowerCase());
    });
  }, [items, query, status]);

  const selectedLead = items.find((lead) => lead.id === selectedLeadId) ?? filteredLeads[0];
  const canEdit = role === "admin" || role === "staff";

  async function updateLeadStatus(leadId: string, nextStatus: LeadStatus) {
    if (!canEdit) return;

    startTransition(async () => {
      const response = await fetch(`/api/admin/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus })
      });

      if (!response.ok) {
        setToast("לא הצלחנו לעדכן את הסטטוס.");
        return;
      }

      setItems((current) =>
        current.map((lead) => (lead.id === leadId ? { ...lead, status: nextStatus } : lead))
      );
      setToast("הסטטוס עודכן בהצלחה.");
      window.setTimeout(() => setToast(""), 2200);
    });
  }

  return (
    <div className="grid gap-6">
      <section className="glass-edge rounded-lg border border-white/12 bg-white/[0.055] p-5 shadow-[0_24px_90px_rgba(53,129,255,.16)] backdrop-blur-2xl">
        <div className="relative z-10 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-sm font-semibold text-blue-200">Leads command center</p>
            <h2 className="mt-2 text-3xl font-black sm:text-5xl">בקשות מהאתר</h2>
            <p className="mt-4 max-w-2xl leading-8 text-slate-300">
              כל פנייה מהאתר נכנסת לכאן, עם סינון, חיפוש ושינוי סטטוס מהיר.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
            <label className="relative">
              <Search className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-blue-200" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="חיפוש לפי שם, עסק, טלפון או הודעה"
                className="h-12 w-full rounded-md border border-white/14 bg-[#071426] px-4 pr-12 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-200/70"
              />
            </label>
            <label className="relative">
              <SlidersHorizontal className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-blue-200" />
              <select
                value={status}
                onChange={(event) => setStatus(event.target.value as LeadStatus | "all")}
                className="h-12 rounded-md border border-white/14 bg-[#071426] px-4 pr-12 text-white outline-none transition focus:border-blue-200/70"
              >
                <option value="all">כל הסטטוסים</option>
                {statusOptions.map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.1fr_.9fr]">
        <div className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.045] backdrop-blur-xl">
          <div className="grid grid-cols-[1.2fr_.8fr_.75fr] gap-3 border-b border-white/8 px-4 py-3 text-sm text-slate-400">
            <span>לקוח</span>
            <span>סטטוס</span>
            <span>נוצר</span>
          </div>
          <div className="max-h-[36rem] overflow-y-auto">
            {filteredLeads.length ? (
              filteredLeads.map((lead) => (
                <button
                  key={lead.id}
                  type="button"
                  onClick={() => setSelectedLeadId(lead.id)}
                  className={cn(
                    "grid w-full grid-cols-[1.2fr_.8fr_.75fr] gap-3 border-b border-white/6 px-4 py-4 text-right transition hover:bg-white/[0.055]",
                    selectedLead?.id === lead.id && "bg-blue-300/10"
                  )}
                >
                  <span>
                    <span className="block font-bold">{lead.full_name}</span>
                    <span className="mt-1 block text-sm text-slate-400">{lead.business_name}</span>
                  </span>
                  <span className="text-sm text-blue-100">{leadStatusLabels[lead.status]}</span>
                  <span className="text-sm text-slate-400">{new Date(lead.created_at).toLocaleDateString("he-IL")}</span>
                </button>
              ))
            ) : (
              <div className="p-10 text-center text-slate-400">אין בקשות שמתאימות לסינון.</div>
            )}
          </div>
        </div>

        <aside className="rounded-lg border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl">
          {selectedLead ? (
            <motion.div key={selectedLead.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-blue-200">בקשה נבחרת</p>
                  <h3 className="mt-2 text-2xl font-black">{selectedLead.full_name}</h3>
                  <p className="mt-1 text-slate-400">{selectedLead.business_name}</p>
                </div>
                <span className="rounded-full border border-blue-200/24 bg-blue-300/10 px-3 py-1 text-sm text-blue-100">
                  {leadStatusLabels[selectedLead.status]}
                </span>
              </div>

              <div className="mt-6 grid gap-3 text-sm">
                <p className="rounded-md bg-white/[0.055] p-3">טלפון: {selectedLead.phone}</p>
                <p className="rounded-md bg-white/[0.055] p-3">אימייל: {selectedLead.email}</p>
                <p className="rounded-md bg-white/[0.055] p-3 leading-7">הודעה: {selectedLead.message}</p>
              </div>

              <div className="mt-6">
                <p className="mb-3 text-sm font-semibold text-blue-200">שינוי סטטוס</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {statusOptions.map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      disabled={isPending || selectedLead.status === value}
                      onClick={() => updateLeadStatus(selectedLead.id, value)}
                      className={cn(
                        "rounded-md border px-3 py-2 text-sm transition disabled:cursor-not-allowed disabled:opacity-50",
                        selectedLead.status === value
                          ? "border-blue-200/45 bg-blue-300/12 text-white shadow-glow"
                          : "border-white/10 bg-white/[0.045] text-slate-300 hover:border-white/24 hover:text-white"
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Button disabled={role !== "admin"} className="w-full">
                  <UserPlus className="h-5 w-5" />
                  הפיכה ללקוח
                </Button>
                <Button variant="outline" className="w-full">
                  הוספת הערה
                </Button>
              </div>
            </motion.div>
          ) : (
            <div className="p-8 text-center text-slate-400">בחרו בקשה מהרשימה.</div>
          )}
        </aside>
      </section>

      {toast ? (
        <motion.div
          className="fixed bottom-6 left-6 z-[90] flex items-center gap-3 rounded-lg border border-blue-200/24 bg-[#071426] px-4 py-3 text-blue-100 shadow-glow"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <CheckCircle2 className="h-5 w-5" />
          {toast}
        </motion.div>
      ) : null}
    </div>
  );
}
