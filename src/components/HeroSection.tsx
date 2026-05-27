"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Typewriter } from "./Typewriter";

const EASE = [0.22, 1, 0.36, 1] as const;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.4,
    },
  },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 10, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: EASE },
  },
};

export default function HeroSection() {
  const { t, i18n } = useTranslation();
  const roles = t("hero.roles", { returnObjects: true }) as string[];

  return (
    <section className="hero" id="hero">
      <div className="hero__inner">
        <motion.h1
          className="hero__title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.05 }}
        >
          {t("hero.header")}
        </motion.h1>

        <motion.div
          className="hero__roles"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={i18n.resolvedLanguage}
        >
          {roles.map((role, idx) => {
            const isLast = idx === roles.length - 1;
            return (
              <span
                key={`${role}-${idx}`}
                style={{ display: "inline-flex", alignItems: "center", gap: 12 }}
              >
                <motion.span
                  variants={wordVariants}
                  className={`hero__role ${isLast ? "hero__role--accent" : ""}`}
                >
                  {isLast ? (
                    <Typewriter
                      text={role}
                      speed={80}
                      initialDelay={600}
                      loop={true}
                      waitTime={1500}
                      deleteSpeed={50}
                      showCursor={true}
                      cursorChar="|"
                      cursorClassName=""
                    />
                  ) : (
                    role
                  )}
                </motion.span>
                {!isLast && (
                  <motion.span
                    variants={wordVariants}
                    className="hero__role-sep"
                    aria-hidden="true"
                  >
                    /
                  </motion.span>
                )}
              </span>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
