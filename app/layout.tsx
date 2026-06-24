import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://b-it-care.local"),
  title: "B-IT CARE | ניהול מחשוב, ענן ואבטחת מידע לעסקים",
  description:
    "B-IT CARE מספקת ניהול מחשוב לעסקים, Microsoft 365, גיבויים, אבטחת מידע, שרתים, ענן ותמיכה מקצועית.",
  keywords: [
    "ניהול מחשוב לעסקים",
    "Microsoft 365",
    "אבטחת מידע",
    "גיבויים לעסקים",
    "שירותי ענן",
    "תמיכת IT"
  ],
  openGraph: {
    title: "B-IT CARE | המחשוב של העסק שלך. באחריות שלנו.",
    description:
      "שותף טכנולוגי לעסקים שרוצים מחשוב מאובטח, יציב ומנוהל מקצה לקצה.",
    locale: "he_IL",
    type: "website"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
