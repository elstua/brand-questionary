"use client";

import { motion } from "motion/react";
import type { SliderConfig } from "@/types/questionnaire";

interface SliderInputProps {
  config: SliderConfig;
  value: string;
  onChange: (value: string) => void;
}

const POSITIONS = [
  { value: "-1", pct: 0 },
  { value: "0", pct: 50 },
  { value: "1", pct: 100 },
];

export default function SliderInput({
  config,
  value,
  onChange,
}: SliderInputProps) {
  const activeIdx = POSITIONS.findIndex((p) => p.value === value);
  const activePct = activeIdx >= 0 ? POSITIONS[activeIdx].pct : 50;

  return (
    <div className="space-y-4">
      <div className="relative h-12 flex items-center px-3">
        {/* Track */}
        <div className="absolute left-3 right-3 h-1 rounded-full bg-zinc-200 dark:bg-zinc-700" />

        {/* Snap dots */}
        {POSITIONS.map((pos) => (
          <button
            key={pos.value}
            type="button"
            onClick={() => onChange(pos.value)}
            className="absolute z-10 -translate-x-1/2"
            style={{ left: `calc(12px + ${pos.pct}% * (100% - 24px) / 100)` }}
          >
            <span
              className={`block h-3 w-3 rounded-full border-2 transition-colors ${
                value === pos.value
                  ? "border-zinc-900 bg-zinc-900 dark:border-zinc-100 dark:bg-zinc-100"
                  : "border-zinc-400 bg-white dark:border-zinc-500 dark:bg-zinc-900"
              }`}
            />
          </button>
        ))}

        {/* Animated thumb */}
        {value && (
          <motion.div
            className="absolute z-20 -translate-x-1/2 h-6 w-6 rounded-full bg-zinc-900 dark:bg-zinc-100 shadow-lg"
            initial={false}
            animate={{
              left: `calc(12px + ${activePct}% * (100% - 24px) / 100)`,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
      </div>

      {/* Labels */}
      <div className="flex justify-between text-sm text-zinc-600 dark:text-zinc-400">
        <span className="max-w-[35%] text-left">{config.leftLabel}</span>
        {config.centerLabel && (
          <span className="max-w-[30%] text-center">{config.centerLabel}</span>
        )}
        <span className="max-w-[35%] text-right">{config.rightLabel}</span>
      </div>
    </div>
  );
}
