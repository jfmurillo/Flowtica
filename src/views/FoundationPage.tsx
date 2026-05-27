"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  SearchIcon,
  ChatIcon,
  FilmIcon,
  MegaphoneIcon,
  TrendUpIcon,
  MentorIcon,
  UsersIcon,
  TargetIcon,
} from "../components/Icons";
import TalkGrowthCard from "../components/TalkGrowthCard";

const EASE = [0.22, 1, 0.36, 1] as const;

interface Step {
  title: string;
  body: string;
}

export default function FoundationPage() {
  const { t } = useTranslation();
  const steps = t("foundation.steps", { returnObjects: true }) as Step[];
  const aboutTeam = t("foundation.aboutTeam", { returnObjects: true }) as string[];

  const icons = [
    SearchIcon,
    ChatIcon,
    FilmIcon,
    MegaphoneIcon,
    TrendUpIcon,
    MentorIcon,
  ];

  return (
    <>
      <div className="sky">
        <section className="hero hero--foundation" id="foundation">
          <div className="hero__inner">
            <motion.span
              className="hero__kicker"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
            >
              {t("foundation.kicker")}
            </motion.span>

            <motion.h1
              className="hero__title--small"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              {t("foundation.title1")}
              <br />
              {t("foundation.title2Pre")}{" "}
              <span className="accent">{t("foundation.title2Highlight")}</span>
            </motion.h1>

            <span
              aria-hidden="true"
              style={{
                display: "inline-block",
                width: 64,
                height: 2,
                background: "var(--brand)",
                borderRadius: 2,
                marginTop: 4,
              }}
            />

            <motion.p
              className="hero__subtitle"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
            >
              {t("foundation.intro")}
            </motion.p>
          </div>
        </section>
      </div>

      <section className="section section--tight steps steps--cards" id="how-we-work">
        <div className="container">
          <div className="steps__head">
            <h2 className="section-title">{t("foundation.howWeWorkTitle")}</h2>
          </div>

          <div className="steps__row">
            {steps.map((step, i) => {
              const Icon = icons[i] ?? SearchIcon;
              return (
                <motion.div
                  key={step.title}
                  className="step"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, ease: EASE, delay: i * 0.06 }}
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

      <section className="section section--tight">
        <div className="container container--narrow">
          <div className="dual-panel">
            <div className="dual-panel__col">
              <div className="dual-panel__icon" aria-hidden="true">
                <UsersIcon />
              </div>
              <div>
                <h3 className="dual-panel__title">
                  {t("foundation.aboutTeamTitle")}
                </h3>
                <div className="dual-panel__rule" />
                {aboutTeam.map((p) => (
                  <p key={p} className="dual-panel__body">
                    {p}
                  </p>
                ))}
              </div>
            </div>

            <div className="dual-panel__divider" aria-hidden="true" />

            <div className="dual-panel__col">
              <div className="dual-panel__icon" aria-hidden="true">
                <TargetIcon />
              </div>
              <div>
                <h3 className="dual-panel__title">
                  {t("foundation.ourFocusTitle")}
                </h3>
                <div className="dual-panel__rule" />
                <p className="dual-panel__body">{t("foundation.ourFocus")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container container--narrow">
          <div className="quote-block">
            <span className="quote-block__mark" aria-hidden="true">
              ”
            </span>
            <p className="quote-block__text">{t("foundation.quote")}</p>
            <p className="quote-block__footer">{t("foundation.quoteFooter")}</p>
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
