"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { CheckIcon, CloseIcon } from "./Icons";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ComparisonSection() {
  const { t } = useTranslation();

  const traditional = t("comparison.traditional.items", {
    returnObjects: true,
  }) as string[];
  const flowtica = t("comparison.flowtica.items", {
    returnObjects: true,
  }) as string[];

  return (
    <section className="section section--tight comparison" id="comparison">
      <div className="container">
        <motion.h2
          className="comparison__title"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {t("comparison.title")}{" "}
          <span className="accent">{t("comparison.titleBrand")}</span>
        </motion.h2>

        <div className="comparison__grid">
          <motion.article
            className="compare-card compare-card--traditional"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <header className="compare-card__header">
              <span className="compare-card__badge" aria-hidden="true">
                <CloseIcon strokeWidth={2.4} />
              </span>
              <h3 className="compare-card__title">
                {t("comparison.traditional.title")}
              </h3>
            </header>
            <ul className="compare-card__list">
              {traditional.map((item) => (
                <li key={item}>
                  <span className="compare-card__bullet" aria-hidden="true">
                    <CloseIcon strokeWidth={2.4} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.article>

          <motion.article
            className="compare-card compare-card--flowtica"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          >
            <span className="compare-card__ribbon">
              {t("comparison.recommended")}
            </span>
            <header className="compare-card__header">
              <span className="compare-card__badge" aria-hidden="true">
                <CheckIcon strokeWidth={2.4} />
              </span>
              <h3 className="compare-card__title">
                {t("comparison.flowtica.title")}
              </h3>
            </header>
            <ul className="compare-card__list">
              {flowtica.map((item) => (
                <li key={item}>
                  <span className="compare-card__bullet" aria-hidden="true">
                    <CheckIcon strokeWidth={2.4} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
