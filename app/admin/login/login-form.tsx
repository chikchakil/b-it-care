"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { LockKeyhole, Mail, ShieldCheck, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function AdminLoginForm({
  nextPath,
  isConfigured
}: {
  nextPath?: string;
  isConfigured: boolean;
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submitLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createSupabaseBrowserClient();

    if (!supabase) {
      setError("Supabase עדיין לא מוגדר בקובץ env.");
      setLoading(false);
      return;
    }

    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (loginError) {
      setError("פרטי ההתחברות אינם תקינים או שהמשתמש אינו מורשה.");
      setLoading(false);
      return;
    }

    router.replace(nextPath && nextPath.startsWith("/admin") ? nextPath : "/admin");
    router.refresh();
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#030711] px-4 text-white">
      <div className="noise pointer-events-none fixed inset-0 opacity-[0.035]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(72,153,255,.24),transparent_32rem),radial-gradient(circle_at_80%_0%,rgba(222,238,255,.14),transparent_30rem)]" />
      <motion.section
        className="glass-edge relative z-10 w-full max-w-md rounded-lg border border-white/14 bg-white/[0.065] p-6 shadow-[0_30px_120px_rgba(53,129,255,.28)] backdrop-blur-2xl sm:p-8"
        initial={{ opacity: 0, y: 22, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45 }}
      >
        <div className="relative z-10">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-blue-200">B-IT CARE Admin</p>
              <h1 className="mt-2 text-3xl font-black">כניסה למערכת</h1>
            </div>
            <span className="flex h-12 w-12 items-center justify-center rounded-md border border-blue-200/24 bg-white/10 shadow-glow">
              <ShieldCheck className="h-6 w-6 text-blue-200" />
            </span>
          </div>

          {!isConfigured ? (
            <div className="rounded-lg border border-amber-200/25 bg-amber-300/10 p-4 text-sm leading-7 text-amber-100">
              חסרה הגדרת Supabase. יש להוסיף `NEXT_PUBLIC_SUPABASE_URL` ו-`NEXT_PUBLIC_SUPABASE_ANON_KEY`.
            </div>
          ) : (
            <form onSubmit={submitLogin} className="grid gap-4">
              <label className="grid gap-2 text-sm text-slate-300">
                אימייל
                <span className="relative">
                  <Mail className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-blue-200" />
                  <input
                    required
                    dir="ltr"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="h-12 w-full rounded-md border border-white/14 bg-[#071426] px-4 pr-12 text-left text-white outline-none transition placeholder:text-slate-500 focus:border-blue-200/70 focus:bg-[#0a1b32]"
                    placeholder="admin@b-it-care.co.il"
                  />
                </span>
              </label>

              <label className="grid gap-2 text-sm text-slate-300">
                סיסמה
                <span className="relative">
                  <LockKeyhole className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-blue-200" />
                  <input
                    required
                    dir="ltr"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="h-12 w-full rounded-md border border-white/14 bg-[#071426] px-4 pr-12 text-left text-white outline-none transition placeholder:text-slate-500 focus:border-blue-200/70 focus:bg-[#0a1b32]"
                    placeholder="••••••••"
                  />
                </span>
              </label>

              {error ? (
                <motion.p
                  className="rounded-md border border-red-300/20 bg-red-400/10 p-3 text-sm text-red-100"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {error}
                </motion.p>
              ) : null}

              <Button type="submit" size="lg" disabled={loading} className="mt-2 w-full">
                {loading ? "מתחבר..." : "כניסה מאובטחת"}
                <Sparkles className="h-5 w-5" />
              </Button>
            </form>
          )}
        </div>
      </motion.section>
    </main>
  );
}
