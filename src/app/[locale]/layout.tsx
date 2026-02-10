import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { SoundProvider } from "@/components/SoundContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import EasterEggs from "@/components/EasterEggs";
import AchievementProvider from "@/components/AchievementContext";
import dynamic from "next/dynamic";

// Lazy load notification component since it's not needed immediately
const AchievementNotifications = dynamic(
  () => import("@/components/AchievementNotifications")
);

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Leo-Martin Pala | Software Developer & AI Enthusiast",
  description: "Computer Science student at University of Tartu. Passionate about cybersecurity, AI, and building practical solutions.",
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Validate locale
  const validLocale = routing.locales.includes(locale as 'en' | 'et')
    ? locale
    : routing.defaultLocale;

  // Import messages directly for static export
  const messages = (await import(`../../../messages/${validLocale}.json`)).default;

  return (
    <html lang={validLocale} suppressHydrationWarning>
      <body suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <SoundProvider>
              <AchievementProvider>
                <EasterEggs>
                  <Navigation />
                  <main className="min-h-screen">
                    {children}
                  </main>
                  <Footer />
                  <AchievementNotifications />
                </EasterEggs>
              </AchievementProvider>
            </SoundProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
