"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { QUESTIONS } from "@/data/questions";
import type { Answer } from "@/types/questionnaire";
import SliderInput from "./SliderInput";
import QuadrantMap from "./QuadrantMap";
import MultiTextInput from "./MultiTextInput";
import ToneCards from "./ToneCards";
import IconChoice from "./IconChoice";
import ChoiceOrCustom from "./ChoiceOrCustom";

function defaultValue(type: string): string | string[] {
  switch (type) {
    case "multiple":
    case "multi_text":
      return [];
    default:
      return "";
  }
}

export default function Questionnaire() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentValue, setCurrentValue] = useState<string | string[]>(
    defaultValue(QUESTIONS[0].type)
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const question = QUESTIONS[currentStep];
  const isLastQuestion = currentStep === QUESTIONS.length - 1;

  const saveCurrentAnswer = () => {
    setAnswers((prev) => [
      ...prev.filter((a) => a.questionId !== question.id),
      { questionId: question.id, value: currentValue },
    ]);
  };

  const handleNext = () => {
    saveCurrentAnswer();

    if (isLastQuestion) {
      handleSubmit();
    } else {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      const nextQ = QUESTIONS[nextStep];
      const existing = answers.find((a) => a.questionId === nextQ.id)?.value;
      setCurrentValue(existing ?? defaultValue(nextQ.type));
    }
  };

  const handleBack = () => {
    saveCurrentAnswer();
    const prevStep = currentStep - 1;
    setCurrentStep(prevStep);
    const prevQ = QUESTIONS[prevStep];
    const existing = answers.find((a) => a.questionId === prevQ.id)?.value;
    setCurrentValue(existing ?? defaultValue(prevQ.type));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const payload = {
      answers: [
        ...answers.filter((a) => a.questionId !== question.id),
        { questionId: question.id, value: currentValue },
      ],
      submittedAt: new Date().toISOString(),
    };

    try {
      const res = await fetch("/api/answers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setIsComplete(true);
      } else {
        console.error("Submission failed:", await res.text());
      }
    } catch (err) {
      console.error("Submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleMultiple = (option: string) => {
    const arr = Array.isArray(currentValue) ? [...currentValue] : [];
    const idx = arr.indexOf(option);
    if (idx >= 0) arr.splice(idx, 1);
    else arr.push(option);
    setCurrentValue(arr);
  };

  const canProceed = (() => {
    switch (question.type) {
      case "text":
        return (
          typeof currentValue === "string" && currentValue.trim().length > 0
        );
      case "single":
        return typeof currentValue === "string" && currentValue.length > 0;
      case "multiple":
        return Array.isArray(currentValue) && currentValue.length > 0;
      case "slider":
        return typeof currentValue === "string" && currentValue !== "";
      case "quadrant":
        return typeof currentValue === "string" && currentValue.includes(",");
      case "multi_text": {
        if (!Array.isArray(currentValue)) return false;
        const fields = question.multiTextFields ?? [];
        return fields.every((_, i) => (currentValue[i] ?? "").trim().length > 0);
      }
      case "tone_cards":
        return typeof currentValue === "string" && currentValue.length > 0;
      case "icon_choice":
        return typeof currentValue === "string" && currentValue.length > 0;
      case "choice_or_custom":
        return typeof currentValue === "string" && currentValue.trim().length > 0;
      default:
        return false;
    }
  })();

  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 p-8 text-center"
      >
        <h2 className="text-2xl font-semibold text-emerald-800 dark:text-emerald-200">
          Thank you!
        </h2>
        <p className="mt-2 text-emerald-700 dark:text-emerald-300">
          Your answers have been saved.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Progress bar */}
      <div className="mb-8 h-1.5 w-full rounded-full bg-zinc-200 dark:bg-zinc-700 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-zinc-900 dark:bg-zinc-100"
          initial={{ width: 0 }}
          animate={{
            width: `${((currentStep + 1) / QUESTIONS.length) * 100}%`,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </div>

      {/* Step counter */}
      <div className="mb-2 text-xs text-zinc-400 dark:text-zinc-500">
        {currentStep + 1} / {QUESTIONS.length}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="space-y-6"
        >
          {/* Section header */}
          {question.section && (
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                {question.section}
              </span>
              <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-700" />
            </div>
          )}

          {/* Question text */}
          <h2 className="text-xl font-medium text-zinc-900 dark:text-zinc-100">
            {question.text}
          </h2>

          {/* ── Text input ── */}
          {question.type === "text" && (
            <input
              type="text"
              value={typeof currentValue === "string" ? currentValue : ""}
              onChange={(e) => setCurrentValue(e.target.value)}
              placeholder={question.placeholder ?? "Type your answer..."}
              className="w-full rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 px-4 py-3 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
              autoFocus
            />
          )}

          {/* ── Single choice ── */}
          {question.type === "single" && question.options && (
            <div className="space-y-2">
              {question.options.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setCurrentValue(opt)}
                  className={`block w-full rounded-lg border px-4 py-3 text-left transition-all ${
                    currentValue === opt
                      ? "border-zinc-900 dark:border-zinc-100 bg-zinc-100 dark:bg-zinc-800"
                      : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}

          {/* ── Multiple choice ── */}
          {question.type === "multiple" && question.options && (
            <div className="space-y-2">
              {question.options.map((opt) => {
                const arr = Array.isArray(currentValue) ? currentValue : [];
                const selected = arr.includes(opt);
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => toggleMultiple(opt)}
                    className={`block w-full rounded-lg border px-4 py-3 text-left transition-all flex items-center gap-3 ${
                      selected
                        ? "border-zinc-900 dark:border-zinc-100 bg-zinc-100 dark:bg-zinc-800"
                        : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500"
                    }`}
                  >
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                        selected
                          ? "border-zinc-900 dark:border-zinc-100"
                          : "border-zinc-400"
                      }`}
                    >
                      {selected && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="block h-2.5 w-2.5 rounded-full bg-zinc-900 dark:bg-zinc-100"
                        />
                      )}
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>
          )}

          {/* ── Slider ── */}
          {question.type === "slider" && question.sliderConfig && (
            <SliderInput
              config={question.sliderConfig}
              value={typeof currentValue === "string" ? currentValue : ""}
              onChange={(v) => setCurrentValue(v)}
            />
          )}

          {/* ── Quadrant map ── */}
          {question.type === "quadrant" && question.quadrantConfig && (
            <QuadrantMap
              config={question.quadrantConfig}
              value={typeof currentValue === "string" ? currentValue : ""}
              onChange={(v) => setCurrentValue(v)}
            />
          )}

          {/* ── Multi text ── */}
          {question.type === "multi_text" && question.multiTextFields && (
            <MultiTextInput
              fields={question.multiTextFields}
              value={Array.isArray(currentValue) ? currentValue : []}
              onChange={(v) => setCurrentValue(v)}
            />
          )}

          {/* ── Tone cards ── */}
          {question.type === "tone_cards" && question.toneCardOptions && (
            <ToneCards
              options={question.toneCardOptions}
              value={typeof currentValue === "string" ? currentValue : ""}
              onChange={(v) => setCurrentValue(v)}
            />
          )}

          {/* ── Icon choice ── */}
          {question.type === "icon_choice" && question.iconOptions && (
            <IconChoice
              options={question.iconOptions}
              value={typeof currentValue === "string" ? currentValue : ""}
              onChange={(v) => setCurrentValue(v)}
            />
          )}

          {/* ── Choice or custom ── */}
          {question.type === "choice_or_custom" &&
            question.choiceOrCustomOptions && (
              <ChoiceOrCustom
                options={question.choiceOrCustomOptions}
                value={typeof currentValue === "string" ? currentValue : ""}
                onChange={(v) => setCurrentValue(v)}
              />
            )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="mt-8 flex gap-3">
        {currentStep > 0 && (
          <button
            type="button"
            onClick={handleBack}
            className="rounded-lg border border-zinc-300 dark:border-zinc-600 px-4 py-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            Back
          </button>
        )}
        <button
          type="button"
          onClick={handleNext}
          disabled={!canProceed || isSubmitting}
          className="ml-auto rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-6 py-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
        >
          {isSubmitting ? "Sending..." : isLastQuestion ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  );
}
