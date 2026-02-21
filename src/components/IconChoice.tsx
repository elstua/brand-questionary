"use client";

import { motion } from "motion/react";
import type { IconOption } from "@/types/questionnaire";

interface IconChoiceProps {
  options: IconOption[];
  value: string;
  onChange: (value: string) => void;
}

export default function IconChoice({
  options,
  value,
  onChange,
}: IconChoiceProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {options.map((opt) => {
        const selected = value === opt.label;
        return (
          <button
            key={opt.label}
            type="button"
            onClick={() => onChange(opt.label)}
            className={`relative flex flex-col items-center gap-3 rounded-xl border-2 px-6 py-8 transition-all ${
              selected
                ? "border-zinc-900 bg-zinc-100 dark:border-zinc-100 dark:bg-zinc-800"
                : "border-zinc-200 hover:border-zinc-400 dark:border-zinc-700 dark:hover:border-zinc-500"
            }`}
          >
            <span className="text-4xl">{opt.icon}</span>
            <span
              className={`text-sm font-medium ${
                selected
                  ? "text-zinc-900 dark:text-zinc-100"
                  : "text-zinc-600 dark:text-zinc-400"
              }`}
            >
              {opt.label}
            </span>
            {selected && (
              <motion.div
                layoutId="icon-choice-indicator"
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <svg
                  className="h-3 w-3 text-white dark:text-zinc-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </motion.div>
            )}
          </button>
        );
      })}
    </div>
  );
}
