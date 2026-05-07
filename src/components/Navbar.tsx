import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { ArrowUpRightIcon, CloseIcon } from "./Icons";
import { useCalendlyUrl } from "../hooks/useCalendly";

const BASE = import.meta.env.BASE_URL;

interface NavbarProps {
  onContactClick: () => void;
  onServicesClick: () => void;
}

export default function Navbar({
  onContactClick,
  onServicesClick,
}: NavbarProps) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const calendlyUrl = useCalendlyUrl();

  const switchLang = (lng: "en" | "es") => {
    void i18n.changeLanguage(lng);
  };

  const handleNav = (action: () => void) => {
    setDrawerOpen(false);
    setTimeout(action, 200);
  };

  const goHomeAndScrollToContact = () => {
    navigate("/");
    setTimeout(() => onContactClick(), 60);
  };

  const goHomeAndScrollToServices = () => {
    navigate("/");
    setTimeout(() => onServicesClick(), 60);
  };

  // Normalize so en-US / es-MX match "en" / "es" for flag highlighting.
  const langPrefix =
    ((i18n.resolvedLanguage ?? i18n.language ?? "en").split("-")[0] ||
      "en").toLowerCase();

  return (
    <>
      <motion.nav
        className="nav"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <NavLink to="/" className="nav__brand" aria-label={t("brand")}>
          {t("brand")}
          <span className="dot">.</span>
        </NavLink>

        <div className="nav__links">
          <NavLink
            to="/foundation"
            className={({ isActive }) =>
              `nav__link ${isActive ? "nav__link--active" : ""}`
            }
          >
            {t("nav.foundation")}
          </NavLink>
          <button
            type="button"
            className="nav__link"
            onClick={goHomeAndScrollToContact}
          >
            {t("nav.contact")}
          </button>
          <NavLink
            to="/mission"
            className={({ isActive }) =>
              `nav__link ${isActive ? "nav__link--active" : ""}`
            }
          >
            {t("nav.mission")}
          </NavLink>
          <button
            type="button"
            className="nav__link"
            onClick={goHomeAndScrollToServices}
          >
            {t("nav.services")}
          </button>
        </div>

        <div className="nav__right">
          <a
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary nav__cta-lg"
          >
            {t("nav.cta")}
            <ArrowUpRightIcon className="btn__arrow" width={16} height={16} />
          </a>

          <button
            type="button"
            className={`flag-btn ${
              langPrefix === "es" ? "flag-btn--active" : ""
            }`}
            onClick={() => switchLang("es")}
            aria-label={t("nav.spanish")}
            title={t("nav.spanish")}
          >
            <img src={`${BASE}flags/es.svg`} alt="" />
          </button>
          <button
            type="button"
            className={`flag-btn ${
              langPrefix === "en" ? "flag-btn--active" : ""
            }`}
            onClick={() => switchLang("en")}
            aria-label={t("nav.english")}
            title={t("nav.english")}
          >
            <img src={`${BASE}flags/gb.svg`} alt="" />
          </button>

          <ThemeToggle />

          <button
            type="button"
            className={`icon-btn burger ${drawerOpen ? "burger--open" : ""}`}
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
                  <CloseIcon width={16} height={16} />
                </button>
              </div>

              <div className="drawer__toolbar">
                <span className="drawer__toolbar-label">{t("nav.language")}</span>
                <div className="drawer__toolbar-row">
                  <button
                    type="button"
                    className={`flag-btn ${
                      langPrefix === "es" ? "flag-btn--active" : ""
                    }`}
                    onClick={() => switchLang("es")}
                    aria-label={t("nav.spanish")}
                  >
                    <img src={`${BASE}flags/es.svg`} alt="" />
                  </button>
                  <button
                    type="button"
                    className={`flag-btn ${
                      langPrefix === "en" ? "flag-btn--active" : ""
                    }`}
                    onClick={() => switchLang("en")}
                    aria-label={t("nav.english")}
                  >
                    <img src={`${BASE}flags/gb.svg`} alt="" />
                  </button>
                  <ThemeToggle />
                </div>
              </div>

              <nav className="drawer__nav">
                <button
                  type="button"
                  className="drawer__link"
                  onClick={() => handleNav(() => navigate("/"))}
                >
                  {t("nav.home")}
                </button>
                <button
                  type="button"
                  className="drawer__link"
                  onClick={() => handleNav(() => navigate("/foundation"))}
                >
                  {t("nav.foundation")}
                </button>
                <button
                  type="button"
                  className="drawer__link"
                  onClick={() => handleNav(goHomeAndScrollToServices)}
                >
                  {t("nav.services")}
                </button>
                <button
                  type="button"
                  className="drawer__link"
                  onClick={() => handleNav(() => navigate("/mission"))}
                >
                  {t("nav.mission")}
                </button>
                <button
                  type="button"
                  className="drawer__link"
                  onClick={() => handleNav(goHomeAndScrollToContact)}
                >
                  {t("nav.contact")}
                </button>
              </nav>

              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary btn--full drawer__cta"
                onClick={() => setDrawerOpen(false)}
              >
                {t("nav.cta")}
                <ArrowUpRightIcon className="btn__arrow" width={16} height={16} />
              </a>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
