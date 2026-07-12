import type { LucideIcon } from "lucide-react";

export default function ComingSoonModule({
  icon: Icon,
  title,
  description
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <section className="glass-edge rounded-lg border border-white/12 bg-white/[0.055] p-6 shadow-[0_24px_90px_rgba(53,129,255,.16)] backdrop-blur-2xl">
      <div className="relative z-10">
        <span className="flex h-14 w-14 items-center justify-center rounded-md bg-white/10 text-blue-200 shadow-glow">
          <Icon className="h-7 w-7" />
        </span>
        <p className="mt-6 text-sm font-semibold text-blue-200">מודול מוכן להרחבה</p>
        <h2 className="mt-2 text-4xl font-black">{title}</h2>
        <p className="mt-4 max-w-2xl leading-8 text-slate-300">{description}</p>
        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {["UI מוכן", "הרשאות מוכנות", "נתיב פעיל"].map((label) => (
            <div key={label} className="rounded-lg border border-white/10 bg-[#071426]/72 p-4 text-sm text-slate-300">
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
