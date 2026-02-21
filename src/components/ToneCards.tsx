"use client";

import { motion } from "motion/react";
import type { ToneCardOption } from "@/types/questionnaire";

interface ToneCardsProps {
  options: ToneCardOption[];
  value: string;
  onChange: (value: string) => void;
}

export default function ToneCards({
  options,
  value,
  onChange,
}: ToneCardsProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {options.map((opt) => {
        const selected = value === opt.label;
        return (
          <button
            key={opt.label}
            type="button"
            onClick={() => onChange(opt.label)}
            className={`relative flex flex-col rounded-xl border-2 p-4 text-left transition-all ${
              selected
                ? "border-zinc-900 bg-zinc-50 dark:border-zinc-100 dark:bg-zinc-800/60"
                : "border-zinc-200 hover:border-zinc-400 dark:border-zinc-700 dark:hover:border-zinc-500"
            }`}
          >
            <span
              className={`text-sm font-semibold ${
                selected
                  ? "text-zinc-900 dark:text-zinc-100"
                  : "text-zinc-700 dark:text-zinc-300"
              }`}
            >
              {opt.label}
            </span>
            <span className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              {opt.description}
            </span>

            {/* Mini UI mockup */}
            <div className="mt-3 rounded-lg border border-dashed border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-2 w-2 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                <div className="h-1.5 w-12 rounded bg-zinc-200 dark:bg-zinc-700" />
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 italic">
                {opt.mockupText}
              </p>
            </div>

            {selected && (
              <motion.div
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
