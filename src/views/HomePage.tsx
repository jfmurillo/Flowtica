"use client";

import HeroSection from "../components/HeroSection";
import ServicesSection from "../components/ServicesSection";
import ComparisonSection from "../components/ComparisonSection";
import HowItWorksSection from "../components/HowItWorksSection";
import ContactForm from "../components/ContactForm";

export default function HomePage() {
  return (
    <>
      <div className="sky">
        <HeroSection />
        <ServicesSection />
      </div>
      <ComparisonSection />
      <HowItWorksSection />
      <ContactForm />
    </>
  );
}
