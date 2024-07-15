import "./global.css";
import type { Metadata } from "next";
import { Navbar } from "./components/nav";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "./components/footer";
import { baseUrl } from "./sitemap";
import { GoogleAnalytics } from "@next/third-parties/google";

import {
  Inter as SansFont,
  JetBrains_Mono as MonoFont,
} from "next/font/google";

const sans = SansFont({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});
const mono = MonoFont({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Juan Rodríguez Morais - Blog",
    template: "%s - Juan Rodríguez Morais - Blog",
  },
  openGraph: {
    title: "Personal Blog",
    description: "This is my personal blog.",
    url: baseUrl,
    siteName: "Personal Blog",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const cx = (...classes: string[]) => classes.filter(Boolean).join(" ");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cx(sans.variable, mono.variable)}>
      <body className="antialiased max-w-screen-lg mt-8 px-6 lg:px-10 mx-auto">
        <main className="flex-auto min-w-0 mt-6 flex flex-col">
          <Navbar />
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
        </main>
        <GoogleAnalytics gaId="UA-52663114-1" />
      </body>
    </html>
  );
}
