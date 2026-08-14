import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "360 GMB — AI-Powered Local Business Growth SaaS",
  description: "Worldwide AI-powered Google Business Profile optimization platform. Audit profiles, track local SEO, discover keywords, analyze competitors, and automate review responses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakartaSans.variable} min-h-screen antialiased overflow-x-hidden`}>
      <body className="min-h-screen font-sans bg-[#F7F3EC] text-slate-900 flex flex-col overflow-x-hidden">{children}</body>
    </html>
  );
}
