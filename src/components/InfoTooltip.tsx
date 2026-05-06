import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface InfoTooltipProps {
  text: string;
  label: string;
  inline?: boolean;
  icon?: string;
}

export default function InfoTooltip({
  text,
  label,
  inline = false,
  icon = "i",
}: InfoTooltipProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const handle = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open]);

  return (
    <div
      ref={ref}
      style={{
        position: inline ? "relative" : "absolute",
        right: inline ? "auto" : 24,
        bottom: inline ? "auto" : 24,
        display: "inline-block",
      }}
    >
      <button
        type="button"
        className={`info-btn ${inline ? "info-btn--inline" : ""}`}
        onClick={() => setOpen((s) => !s)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        aria-label={label}
        style={inline ? { position: "relative", right: "auto", bottom: "auto" } : undefined}
      >
        {icon}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className={`tooltip ${inline ? "tooltip--inline" : ""}`}
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            role="tooltip"
          >
            {text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
