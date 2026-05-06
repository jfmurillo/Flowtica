import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";

import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ServicesSection from "./components/ServicesSection";
import GrowthSection from "./components/GrowthSection";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import CalendlyButton from "./components/CalendlyButton";

export default function App() {
  const [loading, setLoading] = useState(true);

  const heroRef = useRef<HTMLElement | null>(null);
  const servicesRef = useRef<HTMLElement | null>(null);
  const contactRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!loading) {
      document.body.style.overflow = "";
    } else {
      document.body.style.overflow = "hidden";
    }
  }, [loading]);

  const scrollTo = (ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" />}
      </AnimatePresence>

      <Navbar
        onContactClick={() => scrollTo(contactRef)}
        onServicesClick={() => scrollTo(servicesRef)}
        onHomeClick={scrollTop}
      />

      <main>
        <HeroSection ref={heroRef} />
        <ServicesSection
          ref={servicesRef}
          onCtaClick={() => scrollTo(contactRef)}
        />
        <GrowthSection />
        <ContactForm ref={contactRef} />
      </main>

      <Footer onContactClick={() => scrollTo(contactRef)} />
      <CalendlyButton />
    </>
  );
}
