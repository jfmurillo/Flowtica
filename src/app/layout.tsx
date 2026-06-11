import type { Metadata } from "next";
import Script from "next/script";
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

const META_PIXEL_ID = "1975888326376170";
const META_PIXEL_SCRIPT = `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`;

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
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: META_PIXEL_SCRIPT }}
        />
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
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
