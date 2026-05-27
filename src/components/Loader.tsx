"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useTranslation } from "react-i18next";

const EASE = [0.22, 1, 0.36, 1] as const;

const letterVariants: Variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.15 + i * 0.06,
      duration: 0.55,
      ease: EASE,
    },
  }),
};

export default function Loader() {
  const { t } = useTranslation();
  const title = t("loader.title");
  const letters = title.split("");

  return (
    <motion.div
      className="loader"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: 0.5, ease: "easeInOut" },
      }}
    >
      <motion.div
        className="loader__line"
        initial={{ scaleX: 0, width: 200 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
        style={{ width: 200 }}
      />

      <h1 className="loader__title" aria-label={title}>
        {letters.map((char, i) => (
          <span
            key={`${char}-${i}`}
            style={{ display: "inline-block", overflow: "hidden" }}
          >
            <motion.span
              custom={i}
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              style={{ display: "inline-block" }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          </span>
        ))}
        <motion.span
          className="dot"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 + letters.length * 0.06, duration: 0.5 }}
          style={{ display: "inline-block" }}
        >
          .
        </motion.span>
      </h1>

      <motion.div
        className="loader__sub"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85, duration: 0.4 }}
      >
        {t("loader.subtitle")}
      </motion.div>

      <motion.div
        className="loader__line"
        initial={{ scaleX: 0, width: 200 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
        style={{ width: 200 }}
      />
    </motion.div>
  );
}
