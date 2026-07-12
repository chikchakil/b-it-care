"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
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
  Wrench,
  X
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
    title: "שיחת היכרות",
    icon: Users,
    text: "נבין איך העסק עובד היום, כמה מחשבים קיימים, אילו תוכנות בשימוש ומה הבעיות שחוזרות על עצמן. המטרה היא להבין את הצורך לפני שמציעים פתרון."
  },
  {
    title: "בדיקת מצב",
    icon: ScanSearch,
    text: "נבדוק את סביבת המחשוב, הגיבויים, האבטחה, Microsoft 365, הרשאות משתמשים והציוד הקיים. כך אפשר לזהות תקלות, סיכונים וחוסרים לפני שהם פוגעים בעבודה."
  },
  {
    title: "בניית פתרון",
    icon: Wrench,
    text: "נבנה המלצה שמתאימה לגודל העסק, לתקציב ולצורת העבודה שלו. בלי להעמיס שירותים מיותרים ובלי פתרונות שלא באמת צריך."
  },
  {
    title: "הטמעה",
    icon: CheckCircle2,
    text: "נבצע את ההגדרות, השדרוגים והמעברים בצורה מסודרת, עם מינימום הפרעה לשגרת העבודה. המטרה היא שהעסק ימשיך לעבוד כמה שיותר חלק בזמן השינוי."
  },
  {
    title: "ליווי שוטף",
    icon: ShieldCheck,
    text: "נמשיך ללוות את העסק בתחזוקה, ניטור, פתרון תקלות ושיפור שוטף. כך המחשבים, המיילים, הגיבויים והאבטחה נשארים יציבים לאורך זמן."
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

type ActiveModal = "process" | "contact" | null;
type ContactFormState = {
  fullName: string;
  phone: string;
  email: string;
  business: string;
  employees: string;
  message: string;
};
type ModalFormState = Omit<ContactFormState, "employees">;

const emptyContactForm: ContactFormState = {
  fullName: "",
  phone: "",
  email: "",
  business: "",
  employees: "",
  message: ""
};

const emptyModalForm: ModalFormState = {
  fullName: "",
  phone: "",
  email: "",
  business: "",
  message: ""
};

const contactFormFields = [
  { key: "fullName", label: "שם מלא", type: "text" },
  { key: "phone", label: "טלפון", type: "tel" },
  { key: "email", label: "אימייל", type: "email" },
  { key: "business", label: "שם העסק", type: "text" },
  { key: "employees", label: "מספר עובדים", type: "number" }
] as const;

const modalFormFields = contactFormFields.filter((field) => field.key !== "employees");
const fieldClassName =
  "relative z-20 rounded-md border border-white/14 bg-[#071426] text-white shadow-inner outline-none transition placeholder:text-slate-500 focus:border-blue-200/70 focus:bg-[#0a1b32]";

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
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [modalSubmitted, setModalSubmitted] = useState(false);
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const [contactForm, setContactForm] = useState<ContactFormState>(emptyContactForm);
  const [modalForm, setModalForm] = useState<ModalFormState>(emptyModalForm);
  const [contactError, setContactError] = useState("");
  const [modalError, setModalError] = useState("");
  const [contactLoading, setContactLoading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    const updateScrollPosition = () => {
      setIsScrolledDown(window.scrollY > 160);
    };

    updateScrollPosition();
    window.addEventListener("scroll", updateScrollPosition, { passive: true });

    return () => window.removeEventListener("scroll", updateScrollPosition);
  }, []);

  async function submitLead(payload: ModalFormState) {
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error("lead-submit-failed");
    }
  }

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setContactError("");
    setContactLoading(true);

    try {
      await submitLead(contactForm);
      setSubmitted(true);
      setContactForm(emptyContactForm);
    } catch {
      setContactError("לא הצלחנו לשלוח את הפנייה כרגע. אפשר לנסות שוב בעוד רגע.");
    } finally {
      setContactLoading(false);
    }
  }

  async function submitModalForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setModalError("");
    setModalLoading(true);

    try {
      await submitLead(modalForm);
      setModalSubmitted(true);
      setModalForm(emptyModalForm);
    } catch {
      setModalError("לא הצלחנו לשלוח את הבקשה כרגע. אפשר לנסות שוב בעוד רגע.");
    } finally {
      setModalLoading(false);
    }
  }

  function updateContactField(field: keyof ContactFormState, value: string) {
    setContactForm((current) => ({ ...current, [field]: value }));
  }

  function updateModalField(field: keyof ModalFormState, value: string) {
    setModalForm((current) => ({ ...current, [field]: value }));
  }

  function togglePageScroll() {
    window.scrollTo({
      top: isScrolledDown ? 0 : document.documentElement.scrollHeight,
      behavior: "smooth"
    });
  }

  return (
    <main className="relative min-h-screen overflow-hidden text-white">
      <div className="noise pointer-events-none fixed inset-0 z-0 opacity-[0.035]" />
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/8 bg-[#030711]/72 backdrop-blur-2xl">
        <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8" aria-label="ניווט ראשי">
          <a href="#top" className="flex items-center gap-3 font-bold tracking-normal" aria-label="B-IT CARE">
            <span className="flex h-10 w-10 items-center justify-center rounded-md border border-blue-200/24 bg-white/10 shadow-glow">
              <ShieldCheck className="h-5 w-5 text-blue-200" />
            </span>
            <span className="text-lg">B-IT CARE</span>
          </a>
          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 text-sm text-slate-300 md:flex">
            <a className="transition hover:text-white" href="#services">שירותים</a>
            <a className="transition hover:text-white" href="#process">תהליך</a>
            <a className="transition hover:text-white" href="#about">אודות</a>
            <a className="transition hover:text-white" href="#contact">יצירת קשר</a>
          </div>
        </nav>
      </header>

      <section id="top" className="relative flex min-h-[92vh] items-center pt-24">
        <TechBackdrop />
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-12 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-md border border-blue-200/18 bg-white/8 px-4 py-2 text-sm text-blue-100 backdrop-blur-xl">
              <Sparkles className="h-4 w-4" />
              שותף IT פרימיום לעסקים שרוצים שקט תפעולי
            </div>
            <h1 className="silver-text mx-auto max-w-4xl animate-shimmer text-5xl font-black leading-[1.05] sm:text-6xl lg:text-7xl">
              המחשוב של העסק שלך. באחריות שלנו.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              ניהול מחשבים, Microsoft 365, גיבויים, אבטחת מידע ופתרונות ענן לעסקים.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              >
                <Button
                  size="lg"
                  onClick={() => {
                    setModalSubmitted(false);
                    setActiveModal("contact");
                  }}
                  className="w-full border border-blue-200/34 bg-white/12 text-white shadow-glow backdrop-blur-xl hover:border-blue-100/60 hover:bg-white/18 hover:shadow-[0_0_58px_rgba(178,211,255,0.42)] sm:w-auto"
                >
                  קבלת ייעוץ חינם
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </motion.div>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setActiveModal("process")}
                  className="w-full border border-white/12 bg-white/8 text-blue-100 shadow-glow backdrop-blur-xl hover:border-white/34 hover:bg-white/13 hover:text-white sm:w-auto"
                >
                  איך זה עובד?
                </Button>
              </motion.div>
            </div>
          </motion.div>

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
              <form onSubmit={submitForm} className="relative z-20 grid gap-4" aria-label="טופס יצירת קשר">
                {contactFormFields.map((field) => (
                  <label key={field.key} className="grid gap-2 text-sm text-slate-300">
                    {field.label}
                    <input
                      required
                      type={field.type}
                      value={contactForm[field.key]}
                      onChange={(event) => updateContactField(field.key, event.target.value)}
                      className={cn(fieldClassName, "h-12 px-4")}
                    />
                  </label>
                ))}
                <label className="grid gap-2 text-sm text-slate-300">
                  הודעה קצרה
                  <textarea
                    required
                    rows={4}
                    value={contactForm.message}
                    onChange={(event) => updateContactField("message", event.target.value)}
                    className={cn(fieldClassName, "resize-none px-4 py-3")}
                  />
                </label>
                {contactError ? (
                  <p className="rounded-md border border-red-300/20 bg-red-400/10 p-3 text-sm text-red-100">
                    {contactError}
                  </p>
                ) : null}
                <Button type="submit" size="lg" className="mt-2" disabled={contactLoading}>
                  {contactLoading ? "שולח..." : "שליחת פנייה"}
                  <Mail className="h-5 w-5" />
                </Button>
              </form>
            )}
          </div>
        </Card>
      </section>

      <footer className="relative z-10 border-t border-white/8 px-4 py-6 text-center text-sm text-slate-500">
        © 2026 B-IT CARE. כל הזכויות שמורות.
      </footer>

      <motion.button
        type="button"
        onClick={togglePageScroll}
        className="fixed bottom-6 right-4 z-[70] flex h-12 w-12 items-center justify-center rounded-lg border border-white/14 bg-white/8 text-blue-100 shadow-glow backdrop-blur-xl transition hover:border-white/34 hover:bg-white/14 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 md:bottom-auto md:top-1/2"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        aria-label={isScrolledDown ? "חזרה לראש העמוד" : "מעבר לתחתית העמוד"}
      >
        {isScrolledDown ? <ArrowUp className="h-5 w-5" /> : <ArrowDown className="h-5 w-5" />}
      </motion.button>

      <AnimatePresence>
        {activeModal && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-[#030711]/78 px-4 py-6 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="hero-modal-title"
              className="glass-edge relative max-h-[88vh] w-full max-w-4xl rounded-lg border border-white/14 bg-[#07111f]/94 p-5 text-right text-white shadow-[0_30px_120px_rgba(53,129,255,.34)] backdrop-blur-2xl sm:p-8"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.97 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="relative z-10 max-h-[calc(88vh-2.5rem)] overflow-y-auto pl-1 sm:max-h-[calc(88vh-4rem)]">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-md border border-white/12 bg-white/8 text-blue-100 transition hover:border-white/30 hover:bg-white/14 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
                  aria-label="סגירת חלון"
                >
                  <X className="h-5 w-5" />
                </button>

                {activeModal === "process" ? (
                  <div>
                    <p className="text-sm font-semibold text-blue-200">תהליך העבודה</p>
                    <h2 id="hero-modal-title" className="mt-3 text-3xl font-black sm:text-5xl">
                      איך זה עובד?
                    </h2>
                    <div className="mt-7 grid gap-3">
                      {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                          <div key={step.title} className="rounded-lg border border-white/12 bg-white/[0.055] p-4">
                            <div className="flex gap-4">
                              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-white/10 text-blue-200">
                                <Icon className="h-5 w-5" />
                              </span>
                              <div>
                                <p className="text-sm text-slate-400">שלב {index + 1}</p>
                                <h3 className="mt-1 text-lg font-bold">{step.title}</h3>
                                <p className="mt-2 leading-7 text-slate-300">{step.text}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm font-semibold text-blue-200">הצעד הבא</p>
                    <h2 id="hero-modal-title" className="mt-3 text-3xl font-black sm:text-5xl">
                      קבלת ייעוץ חינם
                    </h2>
                    <p className="mt-5 max-w-2xl leading-8 text-slate-300">
                      ספרו לנו בקצרה מה העסק צריך, ונחזור אליכם עם כיוון ראשוני ברור.
                    </p>

                    {modalSubmitted ? (
                      <motion.div
                        className="mt-7 rounded-lg border border-blue-200/24 bg-blue-300/10 p-6 text-center"
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                      >
                        <CheckCircle2 className="mx-auto h-12 w-12 text-blue-200" />
                        <h3 className="mt-4 text-2xl font-black">הבקשה נרשמה</h3>
                        <p className="mt-2 leading-7 text-slate-300">
                          תודה. נחזור אליכם עם כיוון ראשוני ברור.
                        </p>
                      </motion.div>
                    ) : (
                      <form onSubmit={submitModalForm} className="relative z-20 mt-7 grid gap-4" aria-label="טופס ייעוץ חינם">
                        {modalFormFields.map((field) => (
                          <label key={field.key} className="grid gap-2 text-sm text-slate-300">
                            {field.label}
                            <input
                              required
                              type={field.type}
                              value={modalForm[field.key]}
                              onChange={(event) => updateModalField(field.key, event.target.value)}
                              className={cn(fieldClassName, "h-12 px-4")}
                            />
                          </label>
                        ))}
                        <label className="grid gap-2 text-sm text-slate-300">
                          הודעה קצרה / מה צריך לבדוק
                          <textarea
                            required
                            rows={4}
                            value={modalForm.message}
                            onChange={(event) => updateModalField("message", event.target.value)}
                            className={cn(fieldClassName, "resize-none px-4 py-3")}
                          />
                        </label>
                        {modalError ? (
                          <p className="rounded-md border border-red-300/20 bg-red-400/10 p-3 text-sm text-red-100">
                            {modalError}
                          </p>
                        ) : null}
                        <Button type="submit" size="lg" className="mt-2 w-full sm:w-auto" disabled={modalLoading}>
                          {modalLoading ? "שולח..." : "שליחת בקשה"}
                          <Mail className="h-5 w-5" />
                        </Button>
                      </form>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
