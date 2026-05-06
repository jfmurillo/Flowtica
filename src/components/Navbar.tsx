import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface NavbarProps {
  onContactClick: () => void;
  onServicesClick: () => void;
  onHomeClick: () => void;
}

export default function Navbar({
  onContactClick,
  onServicesClick,
  onHomeClick,
}: NavbarProps) {
  const { t, i18n } = useTranslation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const switchLang = (lng: "en" | "es") => {
    void i18n.changeLanguage(lng);
  };

  const handleNav = (action: () => void) => {
    setDrawerOpen(false);
    setTimeout(action, 200);
  };

  const currentLang = i18n.resolvedLanguage ?? i18n.language;

  return (
    <>
      <motion.nav
        className="nav"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <button
          type="button"
          className="nav__brand"
          onClick={onHomeClick}
          aria-label="Go to top"
        >
          DAYANA <span>·</span> MEDIA
        </button>

        <div className="nav__right">
          <button
            type="button"
            className={`flag-btn ${
              currentLang === "es" ? "flag-btn--active" : ""
            }`}
            onClick={() => switchLang("es")}
            aria-label={t("nav.spanish")}
            title={t("nav.spanish")}
          >
            <img src="/flags/es.svg" alt="" />
          </button>
          <button
            type="button"
            className={`flag-btn ${
              currentLang === "en" ? "flag-btn--active" : ""
            }`}
            onClick={() => switchLang("en")}
            aria-label={t("nav.english")}
            title={t("nav.english")}
          >
            <img src="/flags/us.svg" alt="" />
          </button>

          <button
            type="button"
            className={`burger ${drawerOpen ? "burger--open" : ""}`}
            onClick={() => setDrawerOpen((s) => !s)}
            aria-label={t("nav.menu")}
            aria-expanded={drawerOpen}
          >
            <span className="burger__bar" />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              key="backdrop"
              className="drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setDrawerOpen(false)}
            />
            <motion.aside
              key="drawer"
              className="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              role="dialog"
              aria-modal="true"
            >
              <div className="drawer__header">
                <span className="drawer__title">{t("nav.menu")}</span>
                <button
                  type="button"
                  className="drawer__close"
                  onClick={() => setDrawerOpen(false)}
                  aria-label={t("footer.close")}
                >
                  ×
                </button>
              </div>

              <nav className="drawer__nav">
                <button
                  type="button"
                  className="drawer__link"
                  onClick={() => handleNav(onHomeClick)}
                >
                  {t("nav.home")}
                </button>
                <button
                  type="button"
                  className="drawer__link"
                  onClick={() => handleNav(onServicesClick)}
                >
                  {t("nav.services")}
                </button>
                <button
                  type="button"
                  className="drawer__link"
                  onClick={() => handleNav(onContactClick)}
                >
                  {t("nav.contact")}
                </button>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
