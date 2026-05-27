"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { useRouter } from "next/navigation";
// TODO: re-enable when social accounts are ready
// import { LinkedInIcon, InstagramIcon, MailIcon } from "./Icons";

type ModalKey = "comingSoon" | null;

export default function Footer() {
  const { t } = useTranslation();
  const router = useRouter();
  const [modal, setModal] = useState<ModalKey>(null);

  const goHomeAndScrollToContact = () => router.push("/#contact");
  const goHomeAndScrollToServices = () => router.push("/#how-it-works");

  return (
    <footer className="footer">
      <div className="footer__main">
        <div className="footer__brand">
          {t("brand")}
          <span className="dot">.</span>
        </div>

        <nav className="footer__links" aria-label="Footer">
          <Link href="/foundation" className="footer__link">
            {t("footer.foundation")}
          </Link>
          <button
            type="button"
            className="footer__link"
            onClick={goHomeAndScrollToContact}
          >
            {t("footer.contact")}
          </button>
          <Link href="/mission" className="footer__link">
            {t("footer.mission")}
          </Link>
          <button
            type="button"
            className="footer__link"
            onClick={goHomeAndScrollToServices}
          >
            {t("footer.services")}
          </button>
        </nav>

        {/* TODO: social links — re-enable when accounts are ready
        <div className="footer__socials">
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__social"
            aria-label={t("footer.linkedin")}
            title={t("footer.linkedin")}
          >
            <LinkedInIcon />
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__social"
            aria-label={t("footer.instagram")}
            title={t("footer.instagram")}
          >
            <InstagramIcon />
          </a>
          <a
            href="mailto:hello@flowtica.co"
            className="footer__social"
            aria-label={t("footer.email")}
            title={t("footer.email")}
          >
            <MailIcon />
          </a>
        </div>
        */}
      </div>

      <div className="footer__bar">
        © {new Date().getFullYear()} {t("brand")}. {t("footer.rights")}
      </div>

      <AnimatePresence>
        {modal && (
          <motion.div
            key="modal-backdrop"
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModal(null)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              className="modal"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="modal__title">{t("footer.comingSoon")}</h3>
              <p className="modal__body">{t("footer.comingSoonBody")}</p>
              <button
                type="button"
                className="modal__close"
                onClick={() => setModal(null)}
              >
                {t("footer.close")}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
