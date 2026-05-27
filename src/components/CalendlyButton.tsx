"use client";

import { useTranslation } from "react-i18next";
import { useCalendlyUrl } from "../hooks/useCalendly";

export default function CalendlyButton() {
  const { t } = useTranslation();
  const url = useCalendlyUrl();

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="calendly-fab"
      aria-label={t("calendly.label")}
      title={t("calendly.label")}
    >
      <svg
        className="calendly-fab__logo"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="32" height="32" rx="9" fill="#006BFF" />
        <path
          d="M22.7 19.86c-.27.74-.62 1.42-1.16 2-1.43 1.55-3.31 2.18-5.4 1.93-2.65-.32-4.74-2.27-5.32-4.92-.55-2.51.33-5.04 2.36-6.55 2.06-1.53 4.95-1.55 7.06-.04.55.39 1.02.88 1.4 1.45.05.07.11.14.18.23.14-.55.36-1.04.71-1.46.05-.06.07-.16.06-.24-.13-.94-.55-1.74-1.16-2.45-1.36-1.59-3.13-2.43-5.21-2.6-3.07-.25-5.66.86-7.55 3.31-1.39 1.81-1.92 3.91-1.66 6.18.31 2.69 1.62 4.81 3.83 6.36 1.92 1.36 4.07 1.86 6.4 1.6 2.55-.28 4.61-1.5 6.06-3.62.66-.96 1.05-2.04 1.21-3.2-.49.27-.98.4-1.5.4-.05 0-.1.02-.13.06-.04.06-.04.13-.06.2-.06.45-.16.89-.31 1.31z"
          fill="#fff"
        />
        <circle cx="22" cy="11" r="2" fill="#fff" />
      </svg>
    </a>
  );
}
