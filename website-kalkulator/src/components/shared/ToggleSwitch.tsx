"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ToggleSwitchProps {
  leftLabel: string;
  rightLabel: string;
  value: "left" | "right";
  onChange: (value: "left" | "right") => void;
  className?: string;
}

export default function ToggleSwitch({
  leftLabel,
  rightLabel,
  value,
  onChange,
  className,
}: ToggleSwitchProps) {
  return (
    <div
      className={cn(
        "relative inline-flex items-center rounded-full bg-brand-card p-1 border border-border",
        className
      )}
    >
      {/* Animated background pill */}
      <motion.div
        className="absolute top-1 bottom-1 rounded-full shadow-md"
        style={{
          background:
            "radial-gradient(circle at center, rgb(70, 68, 111) 0%, rgb(0, 0, 26) 100%)",
        }}
        initial={false}
        animate={{
          left: value === "left" ? "4px" : "50%",
          right: value === "right" ? "4px" : "50%",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      />

      <button
        type="button"
        onClick={() => onChange("left")}
        className={cn(
          "relative z-10 flex-1 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-full transition-colors duration-200 text-center",
          value === "left" ? "text-white" : "text-brand-text-muted"
        )}
      >
        {leftLabel}
      </button>
      <button
        type="button"
        onClick={() => onChange("right")}
        className={cn(
          "relative z-10 flex-1 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-full transition-colors duration-200 text-center",
          value === "right" ? "text-white" : "text-brand-text-muted"
        )}
      >
        {rightLabel}
      </button>
    </div>
  );
}
