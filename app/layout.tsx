import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/LanguageProvider";
import LocaleSync from "@/components/LocaleSync";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext", "vietnamese"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Khang Tran — AI-Native Business Analyst & Product Owner",
  description:
    "Business Analyst & Project Manager with 4+ years of full-cycle delivery across CRM, ERP, HRM, LMS and AI-powered platforms — working with an AI agent team orchestrated by Claude Code.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <LanguageProvider>
          <LocaleSync />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
