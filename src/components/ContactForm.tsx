import { forwardRef, useState } from "react";
import type { FormEvent } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import emailjs from "@emailjs/browser";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  social: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

const initial: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  social: "",
  message: "",
};

const ContactForm = forwardRef<HTMLElement>((_, ref) => {
  const { t } = useTranslation();
  const [data, setData] = useState<FormData>(initial);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const update =
    (k: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setData((d) => ({ ...d, [k]: e.target.value }));
      setErrors((errs) => ({ ...errs, [k]: undefined }));
    };

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!data.firstName.trim()) errs.firstName = t("form.required");
    if (!data.lastName.trim()) errs.lastName = t("form.required");
    if (!data.email.trim()) {
      errs.email = t("form.required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errs.email = t("form.invalidEmail");
    }
    if (!data.message.trim()) errs.message = t("form.required");
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as
      | string
      | undefined;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as
      | string
      | undefined;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as
      | string
      | undefined;

    if (!serviceId || !templateId || !publicKey) {
      // Demo mode: simulate a successful submission so the UX can be tested
      // before EmailJS credentials are wired in via .env.
      console.warn(
        "EmailJS env vars missing — simulating success. Configure VITE_EMAILJS_* in .env to send for real.",
      );
      await new Promise((r) => setTimeout(r, 900));
      setStatus("success");
      setData(initial);
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          social: data.social,
          message: data.message,
        },
        { publicKey },
      );
      setStatus("success");
      setData(initial);
    } catch (err) {
      console.error("EmailJS error", err);
      setStatus("error");
    }
  };

  return (
    <section className="section form-section" ref={ref} id="contact">
      <motion.form
        className="form"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        noValidate
      >
        <h2 className="form__title">{t("form.title")}</h2>
        <p className="form__sub">{t("form.subtitle")}</p>

        <div className="form__row">
          <div className={`field ${errors.firstName ? "field--error" : ""}`}>
            <label className="field__label" htmlFor="firstName">
              {t("form.firstName")}
            </label>
            <input
              id="firstName"
              className="field__input"
              type="text"
              value={data.firstName}
              onChange={update("firstName")}
              autoComplete="given-name"
            />
            {errors.firstName && (
              <span className="field__error">{errors.firstName}</span>
            )}
          </div>

          <div className={`field ${errors.lastName ? "field--error" : ""}`}>
            <label className="field__label" htmlFor="lastName">
              {t("form.lastName")}
            </label>
            <input
              id="lastName"
              className="field__input"
              type="text"
              value={data.lastName}
              onChange={update("lastName")}
              autoComplete="family-name"
            />
            {errors.lastName && (
              <span className="field__error">{errors.lastName}</span>
            )}
          </div>
        </div>

        <div className="form__row">
          <div className={`field ${errors.email ? "field--error" : ""}`}>
            <label className="field__label" htmlFor="email">
              {t("form.email")}
            </label>
            <input
              id="email"
              className="field__input"
              type="email"
              value={data.email}
              onChange={update("email")}
              autoComplete="email"
            />
            {errors.email && (
              <span className="field__error">{errors.email}</span>
            )}
          </div>

          <div className="field">
            <label className="field__label" htmlFor="social">
              {t("form.social")}
            </label>
            <input
              id="social"
              className="field__input"
              type="text"
              value={data.social}
              onChange={update("social")}
              placeholder="@yourhandle"
            />
          </div>
        </div>

        <div className={`field ${errors.message ? "field--error" : ""}`}>
          <label className="field__label" htmlFor="message">
            {t("form.message")}
          </label>
          <textarea
            id="message"
            className="field__textarea"
            value={data.message}
            onChange={update("message")}
            placeholder={t("form.messagePlaceholder")}
            rows={6}
          />
          {errors.message && (
            <span className="field__error">{errors.message}</span>
          )}
        </div>

        <button
          type="submit"
          className="form__submit"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? t("form.submitting") : t("form.submit")}
        </button>

        {status === "success" && (
          <motion.div
            className="form__status form__status--success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {t("form.success")}
          </motion.div>
        )}
        {status === "error" && (
          <motion.div
            className="form__status form__status--error"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {t("form.error")}
          </motion.div>
        )}
      </motion.form>
    </section>
  );
});

ContactForm.displayName = "ContactForm";

export default ContactForm;
