"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  CalendarIcon,
  ArrowUpRightIcon,
  LockIcon,
} from "./Icons";
import { useCalendlyUrl } from "../hooks/useCalendly";

const EASE = [0.22, 1, 0.36, 1] as const;

interface TalkGrowthCardProps {
  variant?: "primary" | "success";
  titleKey?: string;
  subKey?: string;
  bodyKey?: string;
  buttonKey?: string;
  confidentialKey?: string;
}

export default function TalkGrowthCard({
  variant = "success",
  titleKey = "foundation.ctaTitle",
  subKey = "foundation.ctaSubtitle",
  bodyKey = "foundation.ctaBody",
  buttonKey = "foundation.ctaButton",
  confidentialKey = "foundation.ctaConfidential",
}: TalkGrowthCardProps) {
  const { t } = useTranslation();
  const calendlyUrl = useCalendlyUrl();

  return (
    <motion.div
      className="talk-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <div className="talk-card__icon" aria-hidden="true">
        <CalendarIcon />
      </div>

      <div>
        <h3 className="talk-card__title">{t(titleKey)}</h3>
        <p className="talk-card__sub">{t(subKey)}</p>
        <p className="talk-card__body">{t(bodyKey)}</p>
      </div>

      <div className="talk-card__action">
        <a
          href={calendlyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`btn btn--${variant === "success" ? "success" : "primary"} btn--lg`}
        >
          {t(buttonKey)}
          <ArrowUpRightIcon className="btn__arrow" width={16} height={16} />
        </a>
        <span className="talk-card__lock">
          <LockIcon />
          {t(confidentialKey)}
        </span>
      </div>
    </motion.div>
  );
}
