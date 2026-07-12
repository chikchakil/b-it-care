import { LockKeyhole } from "lucide-react";

export default function ForbiddenAdminPage() {
  return (
    <section className="glass-edge rounded-lg border border-white/12 bg-white/[0.055] p-6 shadow-[0_24px_90px_rgba(53,129,255,.16)] backdrop-blur-2xl">
      <div className="relative z-10">
        <span className="flex h-14 w-14 items-center justify-center rounded-md bg-white/10 text-blue-200 shadow-glow">
          <LockKeyhole className="h-7 w-7" />
        </span>
        <p className="mt-6 text-sm font-semibold text-blue-200">גישה מוגבלת</p>
        <h2 className="mt-2 text-4xl font-black">אין הרשאה לצפייה במודול הזה</h2>
        <p className="mt-4 max-w-2xl leading-8 text-slate-300">
          משתמשי Staff יכולים לעבוד עם בקשות, לקוחות ומשימות. גישה לפיננסים, הגדרות וניהול עובדים זמינה ל-Admin בלבד.
        </p>
      </div>
    </section>
  );
}
