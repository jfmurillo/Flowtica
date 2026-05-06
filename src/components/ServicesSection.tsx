import { forwardRef, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import { useTranslation } from "react-i18next";
import InfoTooltip from "./InfoTooltip";

interface ServicesSectionProps {
  onCtaClick: () => void;
}

const EASE = [0.22, 1, 0.36, 1] as const;

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: EASE },
  }),
};

const ServicesSection = forwardRef<HTMLElement, ServicesSectionProps>(
  ({ onCtaClick }, ref) => {
    const { t } = useTranslation();
    const localRef = useRef<HTMLDivElement | null>(null);

    // Scroll-driven exit animation: as user scrolls past the section,
    // it visually collapses and fades away.
    const { scrollYProgress } = useScroll({
      target: localRef,
      offset: ["start start", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0.6, 1], [1, 0]);
    const scale = useTransform(scrollYProgress, [0.6, 1], [1, 0.92]);
    const y = useTransform(scrollYProgress, [0.6, 1], [0, -60]);

    const cards = [
      { icon: "📅", title: t("services.flexible") },
      { icon: "💲", title: t("services.affordable") },
      { icon: "🤝", title: t("services.crm") },
    ];

    return (
      <section className="section services" ref={ref} id="services">
        <motion.div
          ref={localRef}
          className="container"
          style={{ opacity, scale, y, position: "relative" }}
        >
          <div className="services__grid">
            {cards.map((c, i) => (
              <motion.div
                key={c.title}
                className="svc-card"
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="svc-card__icon" aria-hidden="true">
                  {c.icon}
                </div>
                <h3 className="svc-card__title">{c.title}</h3>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="svc-cta"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <h2 className="svc-cta__title">{t("services.ctaTitle")}</h2>
            <p className="svc-cta__sub">{t("services.ctaSubtitle")}</p>
            <button
              type="button"
              className="svc-cta__button"
              onClick={onCtaClick}
            >
              {t("services.ctaButton")}
              <span aria-hidden="true">→</span>
            </button>

            <InfoTooltip
              text={t("services.info")}
              label={t("services.infoLabel")}
            />
          </motion.div>
        </motion.div>
      </section>
    );
  },
);

ServicesSection.displayName = "ServicesSection";

export default ServicesSection;
