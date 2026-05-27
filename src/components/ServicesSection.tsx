"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useTranslation } from "react-i18next";
import { MailIcon, DollarIcon, UsersIcon } from "./Icons";
import GrowthCallCard from "./GrowthCallCard";

const EASE = [0.22, 1, 0.36, 1] as const;

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: EASE },
  }),
};

export default function ServicesSection() {
  const { t } = useTranslation();

  const cards = [
    {
      Icon: MailIcon,
      title: t("services.card1.title"),
      body: t("services.card1.body"),
    },
    {
      Icon: DollarIcon,
      title: t("services.card2.title"),
      body: t("services.card2.body"),
    },
    {
      Icon: UsersIcon,
      title: t("services.card3.title"),
      body: t("services.card3.body"),
    },
  ];

  return (
    <section className="section section--tight section--svcs" id="services">
      <div className="container">
        <div className="svc-grid">
          {cards.map((c, i) => {
            const Icon = c.Icon;
            return (
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
                  <Icon />
                </div>
                <h3 className="svc-card__title">{c.title}</h3>
                <p className="svc-card__body">{c.body}</p>
              </motion.div>
            );
          })}
        </div>

        <GrowthCallCard />
      </div>
    </section>
  );
}
