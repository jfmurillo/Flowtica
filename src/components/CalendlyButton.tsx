import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function CalendlyButton() {
  const { t } = useTranslation();
  const url =
    (import.meta.env.VITE_CALENDLY_URL as string | undefined) ??
    "https://calendly.com/placeholder";

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="calendly-fab"
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      aria-label={t("calendly.label")}
    >
      <span className="calendly-fab__icon" aria-hidden="true">
        📅
      </span>
      <span>{t("calendly.label")}</span>
    </motion.a>
  );
}
