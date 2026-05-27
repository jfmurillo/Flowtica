"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useTheme } from "../hooks/useTheme";

export default function ThemeToggle() {
  const { t } = useTranslation();
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className="icon-btn"
      onClick={toggle}
      aria-label={isDark ? t("nav.lightMode") : t("nav.darkMode")}
      title={isDark ? t("nav.lightMode") : t("nav.darkMode")}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.svg
            key="moon"
            className="icon-btn__icon"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            initial={{ rotate: -45, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 45, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.25 }}
          >
            <path
              d="M16.5 12.6A6.5 6.5 0 0 1 7.4 3.5a6.6 6.6 0 0 0-3.4 5.7 6.6 6.6 0 0 0 6.6 6.6 6.6 6.6 0 0 0 5.9-3.2z"
              fill="currentColor"
            />
          </motion.svg>
        ) : (
          <motion.svg
            key="sun"
            className="icon-btn__icon"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            initial={{ rotate: 45, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -45, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.25 }}
          >
            <circle cx="10" cy="10" r="3.6" fill="currentColor" />
            <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <line x1="10" y1="2" x2="10" y2="3.5" />
              <line x1="10" y1="16.5" x2="10" y2="18" />
              <line x1="2" y1="10" x2="3.5" y2="10" />
              <line x1="16.5" y1="10" x2="18" y2="10" />
              <line x1="4.3" y1="4.3" x2="5.4" y2="5.4" />
              <line x1="14.6" y1="14.6" x2="15.7" y2="15.7" />
              <line x1="4.3" y1="15.7" x2="5.4" y2="14.6" />
              <line x1="14.6" y1="5.4" x2="15.7" y2="4.3" />
            </g>
          </motion.svg>
        )}
      </AnimatePresence>
    </button>
  );
}
