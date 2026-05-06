import { forwardRef } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useTranslation } from "react-i18next";

const EASE = [0.22, 1, 0.36, 1] as const;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.4,
    },
  },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE },
  },
};

const HeroSection = forwardRef<HTMLElement>((_, ref) => {
  const { t, i18n } = useTranslation();
  const roles = t("hero.roles", { returnObjects: true }) as string[];

  return (
    <section className="hero" ref={ref} id="hero">
      <div className="hero__inner">
        <motion.div
          className="hero__top-line"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 0.2 }}
        />

        <motion.h1
          className="hero__title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE }}
        >
          {t("hero.header")}
        </motion.h1>

        <motion.div
          className="hero__bottom-line"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 0.2 }}
        />

        <motion.div
          className="hero__roles"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={i18n.resolvedLanguage}
        >
          {roles.map((role, idx) => (
            <span key={`${role}-${idx}`} style={{ display: "inline-flex", alignItems: "center", gap: 16 }}>
              <motion.span variants={wordVariants} className="hero__role">
                {role}
              </motion.span>
              {idx < roles.length - 1 && (
                <motion.span
                  variants={wordVariants}
                  className="hero__role-sep"
                  aria-hidden="true"
                >
                  /
                </motion.span>
              )}
            </span>
          ))}
        </motion.div>

        <motion.div
          className="hero__scroll"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          <span>scroll</span>
          <span className="hero__scroll-dot" />
        </motion.div>
      </div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";

export default HeroSection;
