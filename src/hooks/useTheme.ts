"use client";

import { useCallback, useEffect, useState } from "react";

export type Theme = "dark" | "light";

const STORAGE_KEY = "flowtica-theme";

function getInitial(): Theme {
  if (typeof window === "undefined") return "light";

  // Always default to the brand's light theme on first load. Dark is only
  // shown when the user has explicitly toggled into it (we honor the
  // localStorage choice on subsequent visits). We intentionally do NOT
  // follow `prefers-color-scheme: dark` so phones in iOS dark mode still
  // see the bright Flowtica look.
  const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (stored === "dark" || stored === "light") return stored;

  return "light";
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitial);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  return { theme, toggle, setTheme } as const;
}
