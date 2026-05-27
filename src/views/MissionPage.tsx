"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { TargetIcon } from "../components/Icons";
import TalkGrowthCard from "../components/TalkGrowthCard";

const EASE = [0.22, 1, 0.36, 1] as const;

interface Pillar {
  title: string;
  body: string;
}

export default function MissionPage() {
  const { t } = useTranslation();
  const pillars = t("mission.pillars", { returnObjects: true }) as Pillar[];

  return (
    <>
      <div className="sky">
        <section className="hero hero--foundation" id="mission">
          <div className="hero__inner">
            <motion.span
              className="hero__kicker"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
            >
              {t("mission.kicker")}
            </motion.span>

            <motion.h1
              className="hero__title--small"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              {t("mission.title")}
            </motion.h1>

            <motion.p
              className="hero__subtitle"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
            >
              {t("mission.intro")}
            </motion.p>
          </div>
        </section>
      </div>

      <section className="section section--tight">
        <div className="container">
          <div className="steps__head">
            <h2 className="section-title">{t("mission.pillarsTitle")}</h2>
          </div>

          <div className="svc-grid">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                className="svc-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
              >
                <div className="svc-card__icon" aria-hidden="true">
                  <TargetIcon />
                </div>
                <h3 className="svc-card__title">{p.title}</h3>
                <p className="svc-card__body">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container container--narrow">
          <TalkGrowthCard variant="success" />
        </div>
      </section>
    </>
  );
}
