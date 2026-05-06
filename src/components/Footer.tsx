import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useDialog } from "../hooks/useDialog";

interface FooterProps {
  onContactClick: () => void;
}

type ModalKey = "foundation" | "mission" | "services" | null;

export default function Footer({ onContactClick }: FooterProps) {
  const { t } = useTranslation();
  const [modal, setModal] = useState<ModalKey>(null);
  const closeModal = useCallback(() => setModal(null), []);
  const dialogRef = useDialog<HTMLDivElement>(modal !== null, closeModal);

  return (
    <footer className="footer">
      <div className="footer__links">
        <button
          type="button"
          className="footer__link"
          onClick={() => setModal("foundation")}
        >
          {t("footer.foundation")}
        </button>
        <button
          type="button"
          className="footer__link"
          onClick={onContactClick}
        >
          {t("footer.contact")}
        </button>
        <button
          type="button"
          className="footer__link"
          onClick={() => setModal("mission")}
        >
          {t("footer.mission")}
        </button>
        <button
          type="button"
          className="footer__link"
          onClick={() => setModal("services")}
        >
          {t("footer.services")}
        </button>
      </div>

      <div className="footer__copy">
        © {new Date().getFullYear()} Dayana Media · {t("footer.rights")}
      </div>

      <AnimatePresence>
        {modal && (
          <motion.div
            key="modal-backdrop"
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              ref={dialogRef}
              className="modal"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="footer-modal-title"
            >
              <h3 id="footer-modal-title" className="modal__title">
                {t(`footer.${modal}`)}
              </h3>
              <p className="modal__body">{t("footer.comingSoonBody")}</p>
              <button
                type="button"
                className="modal__close"
                onClick={closeModal}
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
