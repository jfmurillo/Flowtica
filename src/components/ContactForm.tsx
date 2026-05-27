"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import emailjs from "@emailjs/browser";
import {
  TargetIcon,
  CheckCircleIcon,
  LockIcon,
  ShieldIcon,
  ArrowUpRightIcon,
} from "./Icons";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  linkedin: string;
  phone: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

const initial: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  linkedin: "",
  phone: "",
  message: "",
};

export default function ContactForm() {
  const { t } = useTranslation();
  const [data, setData] = useState<FormData>(initial);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const checklist = t("form.checklist", { returnObjects: true }) as string[];

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

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      // Demo mode: simulate a successful submission so the UX can be tested
      // before EmailJS credentials are wired in via .env.local.
      console.warn(
        "EmailJS env vars missing — simulating success. Configure NEXT_PUBLIC_EMAILJS_* in .env.local to send for real.",
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
          linkedin: data.linkedin,
          phone: data.phone,
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
    <section className="section section--tight form-section" id="contact">
      <div className="container">
        <motion.div
          className="form-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <aside className="form-card__left">
            <span className="form-card__kicker">{t("form.kicker")}</span>
            <h2 className="form-card__title">{t("form.title")}</h2>

            <div className="form-card__checklist">
              <div className="form-card__checklist-title">
                <TargetIcon />
                <span>{t("form.checklistTitle")}</span>
              </div>
              <ul className="form-card__list">
                {checklist.map((item) => (
                  <li key={item}>
                    <CheckCircleIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="form-card__privacy">
              <LockIcon />
              <span>{t("form.privacy")}</span>
            </div>

            <div className="form-card__shield">
              <ShieldIcon />
              <p>{t("form.privacyNote")}</p>
            </div>
          </aside>

          <form
            className="form form-card__right"
            onSubmit={handleSubmit}
            noValidate
          >
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
                  placeholder={t("form.firstNamePlaceholder")}
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
                  placeholder={t("form.lastNamePlaceholder")}
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
                  placeholder={t("form.emailPlaceholder")}
                  autoComplete="email"
                />
                {errors.email && (
                  <span className="field__error">{errors.email}</span>
                )}
              </div>

              <div className="field">
                <label className="field__label" htmlFor="linkedin">
                  {t("form.linkedin")}
                </label>
                <input
                  id="linkedin"
                  className="field__input"
                  type="text"
                  value={data.linkedin}
                  onChange={update("linkedin")}
                  placeholder={t("form.linkedinPlaceholder")}
                />
              </div>
            </div>

            <div className="field">
              <label className="field__label" htmlFor="phone">
                {t("form.phone")}
              </label>
              <input
                id="phone"
                className="field__input"
                type="tel"
                value={data.phone}
                onChange={update("phone")}
                placeholder={t("form.phonePlaceholder")}
                autoComplete="tel"
              />
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
                rows={5}
              />
              {errors.message && (
                <span className="field__error">{errors.message}</span>
              )}
            </div>

            <button
              type="submit"
              className="btn btn--primary btn--lg btn--full form__submit"
              disabled={status === "submitting"}
            >
              {status === "submitting" ? t("form.submitting") : t("form.submit")}
              <ArrowUpRightIcon className="btn__arrow" width={16} height={16} />
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
          </form>
        </motion.div>
      </div>
    </section>
  );
}
