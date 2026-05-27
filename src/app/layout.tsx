import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "../providers";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CalendlyButton from "../components/CalendlyButton";
import LoaderWrapper from "../components/LoaderWrapper";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

// Runs synchronously before React hydrates to prevent theme FOUC.
const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem('flowtica-theme');if(t==='dark'||t==='light')document.documentElement.dataset.theme=t;}catch(e){}})();`;

export const metadata: Metadata = {
  title: { default: "Flowtica", template: "%s | Flowtica" },
  description:
    "Flowtica helps business owners build a complete client acquisition system through Meta Ads — combining strategy, creative, and execution.",
  metadataBase: new URL("https://flowticamedia.com"),
  openGraph: {
    type: "website",
    url: "https://flowticamedia.com",
    siteName: "Flowtica",
  },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#2563eb" />
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className={inter.variable}>
        <Providers>
          <LoaderWrapper />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <CalendlyButton />
        </Providers>
      </body>
    </html>
  );
}
