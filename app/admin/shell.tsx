"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  Bell,
  BriefcaseBusiness,
  ClipboardList,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Settings,
  ShieldCheck,
  Sparkles,
  Users
} from "lucide-react";
import { motion } from "framer-motion";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { Profile } from "@/lib/supabase/types";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "סקירה", icon: LayoutDashboard, roles: ["admin", "staff"] },
  { href: "/admin/leads", label: "בקשות מהאתר", icon: ClipboardList, roles: ["admin", "staff"] },
  { href: "/admin/clients", label: "לקוחות", icon: BriefcaseBusiness, roles: ["admin", "staff"] },
  { href: "/admin/tasks", label: "משימות", icon: Bell, roles: ["admin", "staff"] },
  { href: "/admin/payments", label: "תשלומים", icon: CreditCard, roles: ["admin"] },
  { href: "/admin/finance", label: "הכנסות והוצאות", icon: BarChart3, roles: ["admin"] },
  { href: "/admin/settings", label: "הגדרות", icon: Settings, roles: ["admin"] },
  { href: "/admin/staff", label: "עובדים והרשאות", icon: Users, roles: ["admin"] }
];

export default function AdminShell({
  profile,
  children
}: {
  profile: Profile;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const allowedItems = navItems.filter((item) => item.roles.includes(profile.role));

  async function signOut() {
    const supabase = createSupabaseBrowserClient();
    await supabase?.auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-[#030711] text-white">
      <div className="noise pointer-events-none fixed inset-0 z-0 opacity-[0.035]" />
      <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_10%_0%,rgba(40,126,255,.18),transparent_30rem),radial-gradient(circle_at_90%_8%,rgba(222,238,255,.09),transparent_28rem)]" />
      <div className="relative z-10 grid min-h-screen lg:grid-cols-[18rem_1fr]">
        <aside className="border-b border-white/8 bg-[#030711]/78 p-4 backdrop-blur-2xl lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-l">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-md border border-blue-200/24 bg-white/10 shadow-glow">
              <ShieldCheck className="h-5 w-5 text-blue-200" />
            </span>
            <div>
              <p className="font-black">B-IT CARE</p>
              <p className="text-xs text-slate-400">Internal Command Center</p>
            </div>
          </div>

          <div className="mt-5 rounded-lg border border-white/10 bg-white/[0.055] p-3">
            <p className="text-sm font-semibold">{profile.full_name || profile.email}</p>
            <p className="mt-1 text-xs text-blue-200">{profile.role === "admin" ? "Admin" : "Staff"}</p>
          </div>

          <nav className="mt-5 grid gap-2">
            {allowedItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-3 rounded-lg border px-3 py-3 text-sm transition",
                    isActive
                      ? "border-blue-200/45 bg-blue-300/12 text-white shadow-glow"
                      : "border-transparent text-slate-300 hover:border-white/16 hover:bg-white/[0.065] hover:text-white"
                  )}
                >
                  <Icon className="h-5 w-5 text-blue-200 transition group-hover:scale-110" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={signOut}
            className="mt-5 flex w-full items-center gap-3 rounded-lg border border-white/10 bg-white/[0.045] px-3 py-3 text-sm text-slate-300 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
          >
            <LogOut className="h-5 w-5 text-blue-200" />
            יציאה
          </button>
        </aside>

        <section className="min-w-0 p-4 sm:p-6 lg:p-8">
          <motion.header
            className="mb-6 flex flex-col gap-4 rounded-lg border border-white/10 bg-white/[0.045] p-4 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div>
              <p className="flex items-center gap-2 text-sm font-semibold text-blue-200">
                <Sparkles className="h-4 w-4" />
                מערכת פנימית מוגנת
              </p>
              <h1 className="mt-1 text-2xl font-black">מרכז הניהול של B-IT CARE</h1>
            </div>
            <div className="rounded-md border border-blue-200/20 bg-blue-300/10 px-3 py-2 text-sm text-blue-100">
              הרשאה פעילה: {profile.role === "admin" ? "ניהול מלא" : "צוות"}
            </div>
          </motion.header>
          {children}
        </section>
      </div>
    </main>
  );
}
