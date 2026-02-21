"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { ChoiceOrCustomOption } from "@/types/questionnaire";

interface ChoiceOrCustomProps {
  options: ChoiceOrCustomOption[];
  value: string;
  onChange: (value: string) => void;
}

export default function ChoiceOrCustom({
  options,
  value,
  onChange,
}: ChoiceOrCustomProps) {
  const customOption = options.find((o) => o.isCustom);
  const fixedOptions = options.filter((o) => !o.isCustom);
  const isCustomActive =
    value !== "" &&
    !fixedOptions.some((o) => o.label === value) &&
    value !== "";
  const [showCustomInput, setShowCustomInput] = useState(isCustomActive);
  const [customText, setCustomText] = useState(isCustomActive ? value : "");

  useEffect(() => {
    if (fixedOptions.some((o) => o.label === value)) {
      setShowCustomInput(false);
    }
  }, [value]);

  const handleFixedClick = (label: string) => {
    setShowCustomInput(false);
    setCustomText("");
    onChange(label);
  };

  const handleCustomClick = () => {
    setShowCustomInput(true);
    onChange(customText);
  };

  const handleCustomTextChange = (text: string) => {
    setCustomText(text);
    onChange(text);
  };

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        {fixedOptions.map((opt) => (
          <button
            key={opt.label}
            type="button"
            onClick={() => handleFixedClick(opt.label)}
            className={`block w-full rounded-lg border px-4 py-3 text-left transition-all ${
              value === opt.label && !showCustomInput
                ? "border-zinc-900 dark:border-zinc-100 bg-zinc-100 dark:bg-zinc-800"
                : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500"
            }`}
          >
            {opt.label}
          </button>
        ))}

        {customOption && (
          <button
            type="button"
            onClick={handleCustomClick}
            className={`block w-full rounded-lg border px-4 py-3 text-left transition-all ${
              showCustomInput
                ? "border-zinc-900 dark:border-zinc-100 bg-zinc-100 dark:bg-zinc-800"
                : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500"
            }`}
          >
            {customOption.label}
          </button>
        )}
      </div>

      <AnimatePresence>
        {showCustomInput && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <input
              type="text"
              value={customText}
              onChange={(e) => handleCustomTextChange(e.target.value)}
              placeholder="Type your answer..."
              className="w-full rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 px-4 py-3 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
              autoFocus
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
