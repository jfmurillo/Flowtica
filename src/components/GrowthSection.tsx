import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import InfoTooltip from "./InfoTooltip";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function GrowthSection() {
  const { t } = useTranslation();
  const bullets = t("growth.bullets", { returnObjects: true }) as string[];

  return (
    <section className="section growth">
      <motion.div
        className="container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div variants={itemVariants} className="growth__title-wrap">
          <h2 className="growth__title">{t("growth.title")}</h2>
          <InfoTooltip
            text={t("growth.privacy")}
            label={t("growth.privacyLabel")}
            inline
            icon="!"
          />
        </motion.div>

        <motion.p variants={itemVariants} className="growth__intro">
          {t("growth.intro")}
        </motion.p>

        <motion.ul variants={itemVariants} className="growth__list">
          {bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}
