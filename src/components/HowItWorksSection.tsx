"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  SearchIcon,
  TargetIcon,
  PlayIcon,
  TrendUpIcon,
} from "./Icons";

const EASE = [0.22, 1, 0.36, 1] as const;

interface Step {
  title: string;
  body: string;
}

export default function HowItWorksSection() {
  const { t } = useTranslation();
  const steps = t("howItWorks.steps", { returnObjects: true }) as Step[];
  const icons = [SearchIcon, TargetIcon, PlayIcon, TrendUpIcon];

  return (
    <section className="section section--tight steps" id="how-it-works">
      <div className="container">
        <div className="steps__head">
          <span className="kicker">{t("howItWorks.kicker")}</span>
          <h2 className="section-title">{t("howItWorks.title")}</h2>
        </div>

        <div className="steps__row">
          {/* Static dotted path linking the numbered circles. Sits behind
              the steps so it is visible at all times and does not animate
              in with them. */}
          <div className="steps__path" aria-hidden="true" />

          {steps.map((step, i) => {
            const Icon = icons[i] ?? SearchIcon;
            return (
              <motion.div
                key={step.title}
                className="step"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
              >
                <div className="step__number">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="step__icon" aria-hidden="true">
                  <Icon />
                </div>
                <h4 className="step__title">{step.title}</h4>
                <p className="step__body">{step.body}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
