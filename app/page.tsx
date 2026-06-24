"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ArrowLeft,
  BadgeCheck,
  Building2,
  CheckCircle2,
  ChevronDown,
  Cloud,
  DatabaseBackup,
  Gauge,
  Headphones,
  LockKeyhole,
  Mail,
  Network,
  Phone,
  ScanSearch,
  Server,
  ShieldCheck,
  Sparkles,
  Users,
  Wrench
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "ניהול מחשוב לעסקים",
    icon: Network,
    text: "ניהול מלא של תחנות קצה, משתמשים, רשתות, הרשאות ותהליכי IT עם בקרה שוטפת וסטנדרט ארגוני."
  },
  {
    title: "Microsoft 365",
    icon: Cloud,
    text: "הקמה, ניהול ואופטימיזציה של Exchange, Teams, SharePoint, OneDrive ואבטחת זהויות בענן."
  },
  {
    title: "אבטחת מידע",
    icon: ShieldCheck,
    text: "שכבות הגנה לעסק: הרשאות, MFA, אנטי וירוס מתקדם, ניטור, הקשחת מערכות והדרכת עובדים."
  },
  {
    title: "גיבויים והתאוששות מאסון",
    icon: DatabaseBackup,
    text: "אסטרטגיית גיבוי אמינה למידע עסקי קריטי, בדיקות שחזור ותכנית המשכיות עסקית."
  },
  {
    title: "שרתים וענן",
    icon: Server,
    text: "תכנון, הקמה ותחזוקה של שרתים, סביבות ענן, אחסון, רשתות והגירה בטוחה לענן."
  },
  {
    title: "תמיכה מרחוק ובשטח",
    icon: Headphones,
    text: "מענה מקצועי ומהיר למשתמשים, טיפול בתקלות, ביקורי שטח ותיעוד שקוף של כל פעולה."
  }
];

const stats = [
  { label: "זמינות גבוהה", value: 99, suffix: "%", icon: Gauge },
  { label: "פתרונות מותאמים אישית", value: 100, suffix: "%", icon: Sparkles },
  { label: "תגובה מהירה", value: 15, suffix: " דק׳", icon: Phone },
  { label: "ניסיון מקצועי", value: 10, suffix: "+", icon: BadgeCheck },
  { label: "אבטחת מידע", value: 24, suffix: "/7", icon: LockKeyhole }
];

const steps = [
  {
    title: "פגישת היכרות",
    icon: Users,
    text: "מכירים את העסק, היעדים, נקודות הכאב ורמת השירות הנדרשת."
  },
  {
    title: "בדיקת מערכות",
    icon: ScanSearch,
    text: "ממפים מחשבים, רשתות, ענן, גיבויים, הרשאות וסיכונים קיימים."
  },
  {
    title: "בניית פתרון",
    icon: Wrench,
    text: "בונים תכנית עבודה מדויקת עם סדרי עדיפויות, תקציב ואבני דרך."
  },
  {
    title: "הטמעה",
    icon: CheckCircle2,
    text: "מיישמים את הפתרון בצורה מסודרת, מאובטחת ושקופה למשתמשים."
  },
  {
    title: "ליווי שוטף",
    icon: ShieldCheck,
    text: "מנטרים, משפרים, מגבים ומנהלים את סביבת המחשוב לאורך זמן."
  }
];

const faqs = [
  {
    q: "האם אתם מחליפים איש מחשוב פנימי?",
    a: "לעסקים רבים אנחנו משמשים כמחלקת IT מלאה. בעסקים עם צוות פנימי אנחנו משתלבים כשכבת מומחיות, אבטחה ותפעול."
  },
  {
    q: "אפשר לקבל שירות גם לעסק קטן?",
    a: "כן. השירות מותאם לגודל העסק, מספר העובדים, רמת הסיכון והתכניות לצמיחה."
  },
  {
    q: "איך אתם מטפלים באבטחת מידע?",
    a: "אנחנו משלבים הרשאות נכונות, אימות רב שלבי, גיבויים, הגנות תחנה, ניטור, הקשחת ענן ותהליכי עבודה בטוחים."
  },
  {
    q: "כמה מהר מקבלים מענה לתקלות?",
    a: "הטיפול מתועד ומתועדף לפי השפעה עסקית. המטרה היא תגובה מהירה, שקיפות מלאה וצמצום השבתה."
  }
];

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const total = 72;
    const tick = () => {
      frame += 1;
      const eased = 1 - Math.pow(1 - frame / total, 3);
      setCurrent(Math.round(value * eased));
      if (frame < total) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {current}
      {suffix}
    </span>
  );
}

function TiltCard({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { stiffness: 220, damping: 22 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { stiffness: 220, damping: 22 });

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - rect.left) / rect.width - 0.5);
        y.set((event.clientY - rect.top) / rect.height - 0.5);
        event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function TechBackdrop() {
  const nodes = useMemo(
    () => [
      ["12%", "22%"],
      ["31%", "13%"],
      ["52%", "26%"],
      ["72%", "15%"],
      ["88%", "36%"],
      ["64%", "56%"],
      ["38%", "48%"],
      ["18%", "64%"],
      ["79%", "76%"],
      ["45%", "82%"]
    ],
    []
  );

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <div className="grid-mask absolute inset-0 opacity-80" />
      <motion.div
        className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-300/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
        animate={{ rotate: -360 }}
        transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
      />
      <svg className="absolute inset-0 h-full w-full opacity-70" role="presentation">
        {nodes.slice(0, -1).map((node, index) => {
          const next = nodes[index + 1];
          return (
            <motion.line
              key={`${node[0]}-${next[0]}`}
              x1={node[0]}
              y1={node[1]}
              x2={next[0]}
              y2={next[1]}
              stroke="rgba(154,198,255,.42)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0.18, 0.72, 0.24] }}
              transition={{ duration: 3.6, repeat: Infinity, delay: index * 0.22 }}
            />
          );
        })}
      </svg>
      {nodes.map(([left, top], index) => (
        <motion.span
          key={`${left}-${top}`}
          className="absolute h-3 w-3 rounded-full bg-blue-200 shadow-[0_0_24px_rgba(135,190,255,.9)]"
          style={{ left, top }}
          animate={{ scale: [1, 1.65, 1], opacity: [0.55, 1, 0.55] }}
          transition={{ duration: 2.8, repeat: Infinity, delay: index * 0.18 }}
        />
      ))}
      <motion.div
        className="absolute bottom-20 left-10 hidden items-center gap-3 rounded-lg border border-white/12 bg-white/8 px-5 py-4 text-sm text-blue-100 shadow-glow backdrop-blur-xl md:flex"
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <Server className="h-5 w-5" />
        <span>שרתים | ענן | ניטור</span>
      </motion.div>
      <motion.div
        className="absolute right-6 top-28 hidden items-center gap-3 rounded-lg border border-white/12 bg-white/8 px-5 py-4 text-sm text-blue-100 shadow-glow backdrop-blur-xl md:flex"
        animate={{ y: [0, 14, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <Cloud className="h-5 w-5" />
        <span>Microsoft 365 מאובטח</span>
      </motion.div>
    </div>
  );
}

export default function Home() {
  const [activeService, setActiveService] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="relative min-h-screen overflow-hidden text-white">
      <div className="noise pointer-events-none fixed inset-0 z-0 opacity-[0.035]" />
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/8 bg-[#030711]/72 backdrop-blur-2xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8" aria-label="ניווט ראשי">
          <a href="#top" className="flex items-center gap-3 font-bold tracking-normal" aria-label="B-IT CARE">
            <span className="flex h-10 w-10 items-center justify-center rounded-md border border-blue-200/24 bg-white/10 shadow-glow">
              <ShieldCheck className="h-5 w-5 text-blue-200" />
            </span>
            <span className="text-lg">B-IT CARE</span>
          </a>
          <div className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            <a className="transition hover:text-white" href="#services">שירותים</a>
            <a className="transition hover:text-white" href="#process">תהליך</a>
            <a className="transition hover:text-white" href="#about">אודות</a>
            <a className="transition hover:text-white" href="#contact">יצירת קשר</a>
          </div>
          <Button asChild size="default" className="h-10 px-4">
            <a href="#contact">ייעוץ חינם</a>
          </Button>
        </nav>
      </header>

      <section id="top" className="relative flex min-h-[92vh] items-center pt-24">
        <TechBackdrop />
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-[1.08fr_.92fr] lg:px-8">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-md border border-blue-200/18 bg-white/8 px-4 py-2 text-sm text-blue-100 backdrop-blur-xl">
              <Sparkles className="h-4 w-4" />
              שותף IT פרימיום לעסקים שרוצים שקט תפעולי
            </div>
            <h1 className="silver-text animate-shimmer max-w-4xl text-5xl font-black leading-[1.05] sm:text-6xl lg:text-7xl">
              המחשוב של העסק שלך. באחריות שלנו.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              ניהול מחשבים, Microsoft 365, גיבויים, אבטחת מידע ופתרונות ענן לעסקים.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <a href="#contact">
                  קבלת ייעוץ חינם
                  <ArrowLeft className="h-5 w-5" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#process">שיחת היכרות</a>
              </Button>
            </div>
          </motion.div>

          <TiltCard className="glass-edge relative min-h-[24rem] rounded-lg border border-white/12 bg-white/[0.055] p-5 shadow-[0_30px_120px_rgba(53,129,255,.28)] backdrop-blur-2xl">
            <div className="relative z-10 grid h-full gap-4">
              {[
                ["אבטחת זהויות", "MFA פעיל", ShieldCheck],
                ["גיבוי עסקי", "שחזור נבדק", DatabaseBackup],
                ["ענן ושרתים", "ניטור רציף", Server]
              ].map(([title, detail, Icon], index) => (
                <motion.div
                  key={title as string}
                  className="rounded-lg border border-white/12 bg-[#071426]/82 p-5"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + index * 0.14 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">{title as string}</p>
                      <p className="mt-1 text-xl font-bold">{detail as string}</p>
                    </div>
                    <Icon className="h-9 w-9 text-blue-200" />
                  </div>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/8">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-l from-white to-blue-400"
                      initial={{ width: "12%" }}
                      animate={{ width: `${78 + index * 7}%` }}
                      transition={{ duration: 1.2, delay: 0.6 + index * 0.16 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </TiltCard>
        </div>
      </section>

      <section id="services" className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold text-blue-200">שירותים מנוהלים</p>
          <h2 className="mt-3 text-3xl font-black sm:text-5xl">כל שכבות המחשוב במקום אחד</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isActive = activeService === index;
            return (
              <motion.button
                key={service.title}
                onClick={() => setActiveService(index)}
                className={cn(
                  "glass-edge group min-h-[13rem] rounded-lg border p-5 text-right transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300",
                  isActive
                    ? "border-blue-200/42 bg-blue-300/12 shadow-glow"
                    : "border-white/10 bg-white/[0.055] hover:-translate-y-1 hover:border-white/24 hover:bg-white/[0.085]"
                )}
                whileHover={{ y: -4 }}
              >
                <span className="relative z-10 flex h-full flex-col">
                  <span className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-md bg-white/10 text-blue-100">
                      <Icon className="h-6 w-6" />
                    </span>
                    <ChevronDown className={cn("h-5 w-5 transition", isActive && "rotate-180 text-blue-200")} />
                  </span>
                  <span className="mt-5 block text-xl font-bold">{service.title}</span>
                  <motion.span
                    className="block overflow-hidden text-sm leading-7 text-slate-300"
                    initial={false}
                    animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0, marginTop: isActive ? 16 : 0 }}
                  >
                    {service.text}
                  </motion.span>
                </span>
              </motion.button>
            );
          })}
        </div>
      </section>

      <section className="relative z-10 border-y border-white/8 bg-white/[0.035] py-16">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-5 lg:px-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="glass-edge p-5">
                <div className="relative z-10">
                  <Icon className="h-7 w-7 text-blue-200" />
                  <p className="mt-5 text-3xl font-black">
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-2 text-sm text-slate-300">{stat.label}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      <section id="process" className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold text-blue-200">איך זה עובד</p>
          <h2 className="mt-3 text-3xl font-black sm:text-5xl">תהליך שמרגיש כמו מערכת חכמה</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-[.82fr_1.18fr]">
          <div className="grid gap-3">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <button
                  key={step.title}
                  onClick={() => setActiveStep(index)}
                  className={cn(
                    "flex items-center gap-4 rounded-lg border p-4 text-right transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300",
                    activeStep === index
                      ? "border-blue-200/45 bg-blue-300/12 shadow-glow"
                      : "border-white/10 bg-white/[0.055] hover:border-white/24"
                  )}
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-white/10">
                    <Icon className="h-6 w-6 text-blue-200" />
                  </span>
                  <span>
                    <span className="block text-sm text-slate-400">שלב {index + 1}</span>
                    <span className="font-bold">{step.title}</span>
                  </span>
                </button>
              );
            })}
          </div>
          <Card className="glass-edge min-h-[24rem] p-7">
            <motion.div
              key={activeStep}
              className="relative z-10 flex h-full flex-col justify-between"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <div>
                {(() => {
                  const Icon = steps[activeStep].icon;
                  return <Icon className="h-14 w-14 text-blue-200" />;
                })()}
                <p className="mt-8 text-sm text-blue-100">שלב {activeStep + 1} מתוך {steps.length}</p>
                <h3 className="mt-3 text-4xl font-black">{steps[activeStep].title}</h3>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">{steps[activeStep].text}</p>
              </div>
              <div className="mt-10 flex gap-2">
                {steps.map((step, index) => (
                  <span
                    key={step.title}
                    className={cn("h-2 flex-1 rounded-full transition", index <= activeStep ? "bg-blue-300" : "bg-white/10")}
                  />
                ))}
              </div>
            </motion.div>
          </Card>
        </div>
      </section>

      <section id="about" className="relative z-10 border-y border-white/8 bg-[#07111f]/76 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[.9fr_1.1fr] lg:px-8">
          <Card className="glass-edge p-7">
            <div className="relative z-10">
              <Building2 className="h-12 w-12 text-blue-200" />
              <h2 className="mt-6 text-3xl font-black sm:text-5xl">שותף טכנולוגי, לא טכנאי מזדמן</h2>
            </div>
          </Card>
          <div className="flex items-center">
            <p className="text-2xl font-semibold leading-10 text-slate-100">
              אנחנו מאפשרים לבעלי עסקים להתמקד בצמיחה, בזמן שאנחנו מנהלים עבורם את כל עולם המחשוב והטכנולוגיה.
            </p>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold text-blue-200">שאלות נפוצות</p>
          <h2 className="mt-3 text-3xl font-black sm:text-5xl">תשובות לפני שמתחילים</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <Card key={faq.q} className="overflow-hidden">
              <button
                className="flex w-full items-center justify-between gap-4 p-5 text-right font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
                onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                aria-expanded={openFaq === index}
              >
                {faq.q}
                <ChevronDown className={cn("h-5 w-5 shrink-0 transition", openFaq === index && "rotate-180 text-blue-200")} />
              </button>
              <motion.div
                initial={false}
                animate={{ height: openFaq === index ? "auto" : 0, opacity: openFaq === index ? 1 : 0 }}
                className="overflow-hidden"
              >
                <p className="px-5 pb-5 leading-7 text-slate-300">{faq.a}</p>
              </motion.div>
            </Card>
          ))}
        </div>
      </section>

      <section id="contact" className="relative z-10 mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <Card className="glass-edge overflow-hidden p-5 sm:p-8">
          <div className="relative z-10 grid gap-8 lg:grid-cols-[.82fr_1.18fr]">
            <div>
              <p className="text-sm font-semibold text-blue-200">הצעד הבא</p>
              <h2 className="mt-3 text-3xl font-black sm:text-5xl">בואו נבנה לעסק שלך סביבת IT שמרגישה בשליטה</h2>
              <p className="mt-5 leading-8 text-slate-300">
                מלאו פרטים ונחזור אליכם לשיחת היכרות ממוקדת, עם תמונת מצב ראשונית והמלצות פעולה.
              </p>
            </div>
            {submitted ? (
              <motion.div
                className="flex min-h-[27rem] flex-col items-center justify-center rounded-lg border border-blue-200/24 bg-blue-300/10 p-8 text-center"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <motion.div
                  animate={{ scale: [1, 1.12, 1], rotate: [0, 4, -4, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 1.2 }}
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-slate-950 shadow-glow"
                >
                  <CheckCircle2 className="h-10 w-10" />
                </motion.div>
                <h3 className="mt-7 text-3xl font-black">הפנייה התקבלה בהצלחה</h3>
                <p className="mt-3 max-w-md leading-7 text-slate-300">
                  תודה. ניצור קשר בקרוב ונבדוק יחד איך להפוך את המחשוב בעסק למנוהל, מאובטח וחכם יותר.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={submitForm} className="grid gap-4" aria-label="טופס יצירת קשר">
                {[
                  ["שם מלא", "text"],
                  ["טלפון", "tel"],
                  ["אימייל", "email"],
                  ["שם העסק", "text"],
                  ["מספר עובדים", "number"]
                ].map(([label, type]) => (
                  <label key={label} className="grid gap-2 text-sm text-slate-300">
                    {label}
                    <input
                      required
                      type={type}
                      className="h-12 rounded-md border border-white/12 bg-white/8 px-4 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-200/70 focus:bg-white/12"
                    />
                  </label>
                ))}
                <label className="grid gap-2 text-sm text-slate-300">
                  הודעה
                  <textarea
                    required
                    rows={4}
                    className="resize-none rounded-md border border-white/12 bg-white/8 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-200/70 focus:bg-white/12"
                  />
                </label>
                <Button type="submit" size="lg" className="mt-2">
                  שליחת פנייה
                  <Mail className="h-5 w-5" />
                </Button>
              </form>
            )}
          </div>
        </Card>
      </section>
    </main>
  );
}
