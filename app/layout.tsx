import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ErrorBoundary from "@/components/ErrorBoundary";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MODES - Adopt the Daily Routines of World-Class Founders",
  description: "Transform your productivity by adopting the proven daily schedules of Elon Musk, Jeff Bezos, Mark Zuckerberg, and other world-class founders. Track your progress, set goals, and optimize your time.",
  keywords: ["productivity", "time management", "founder routines", "daily schedule", "time blocking", "productivity app"],
  authors: [{ name: "MODES" }],
  openGraph: {
    title: "MODES - Adopt Founder Routines",
    description: "Transform your productivity with proven daily schedules from world-class founders.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "MODES - Adopt Founder Routines",
    description: "Transform your productivity with proven daily schedules from world-class founders.",
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  themeColor: "#10b981",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
