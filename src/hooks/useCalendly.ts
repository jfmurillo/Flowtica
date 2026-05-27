// The canonical Calendly link Dayana wants visitors to land on.
// This is also the fallback used whenever the build did not receive a
// VITE_CALENDLY_URL env var or received one of the old placeholder URLs
// (so a stale GitHub secret can never override the correct destination).
const CALENDLY_URL = "https://calendly.com/dayanamurilloc/30min";

const PLACEHOLDER_HINTS = ["your-handle", "placeholder"];

export function useCalendlyUrl(): string {
  const fromEnv = (process.env.NEXT_PUBLIC_CALENDLY_URL as string | undefined)
    ?.trim();

  if (!fromEnv) return CALENDLY_URL;
  if (PLACEHOLDER_HINTS.some((hint) => fromEnv.includes(hint))) {
    return CALENDLY_URL;
  }
  return fromEnv;
}
