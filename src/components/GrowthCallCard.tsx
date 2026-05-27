"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { CalendarIcon, ChartIcon } from "./Icons";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function GrowthCallCard() {
  const { t } = useTranslation();

  return (
    <motion.div
      className="growth-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <div className="growth-card__icon" aria-hidden="true">
        <CalendarIcon />
      </div>

      <div className="growth-card__body">
        <h3 className="growth-card__title">{t("services.ctaTitle")}</h3>
        <p className="growth-card__sub">{t("services.ctaSubtitle")}</p>
        <div className="growth-card__rule" aria-hidden="true">
          <span className="growth-card__diamond" />
        </div>
        <p className="growth-card__body-text">{t("services.ctaBody")}</p>
      </div>

      <div className="growth-card__chart" aria-hidden="true">
        <ChartIcon />
      </div>
    </motion.div>
  );
}
