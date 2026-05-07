import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CalendlyButton from "./components/CalendlyButton";
import HomePage from "./pages/HomePage";
import FoundationPage from "./pages/FoundationPage";
import MissionPage from "./pages/MissionPage";

function ScrollToTopOnRoute() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);
  return null;
}

function AppShell() {
  const [loading, setLoading] = useState(true);

  const heroRef = useRef<HTMLElement | null>(null);
  const servicesRef = useRef<HTMLElement | null>(null);
  const contactRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
  }, [loading]);

  const scrollTo = (ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToContact = () => scrollTo(contactRef);
  const scrollToServices = () => scrollTo(servicesRef);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" />}
      </AnimatePresence>

      <Navbar
        onContactClick={scrollToContact}
        onServicesClick={scrollToServices}
      />

      <ScrollToTopOnRoute />

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                ref={heroRef}
                servicesRef={servicesRef}
                contactRef={contactRef}
              />
            }
          />
          <Route path="/foundation" element={<FoundationPage />} />
          <Route path="/mission" element={<MissionPage />} />
        </Routes>
      </main>

      <Footer
        onContactClick={scrollToContact}
        onServicesClick={scrollToServices}
      />
      <CalendlyButton />
    </>
  );
}

// Vite's BASE_URL is "/" in dev and "/<repo>/" (or "/" for username.github.io)
// when deployed to GitHub Pages. Strip the trailing slash so BrowserRouter
// receives a clean basename.
const ROUTER_BASENAME = import.meta.env.BASE_URL.replace(/\/$/, "");

export default function App() {
  return (
    <BrowserRouter basename={ROUTER_BASENAME || "/"}>
      <AppShell />
    </BrowserRouter>
  );
}
