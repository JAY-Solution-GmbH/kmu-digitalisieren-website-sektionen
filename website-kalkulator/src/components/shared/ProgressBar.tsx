"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({
  currentStep,
  totalSteps,
}: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-brand-text-muted tracking-wide uppercase">
          Schritt {currentStep} von {totalSteps}
        </span>
        <span className="text-xs font-semibold text-brand-primary">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="w-full h-2 bg-brand-card rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background:
              "linear-gradient(90deg, #191B41 0%, rgb(70, 68, 111) 100%)",
          }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}
