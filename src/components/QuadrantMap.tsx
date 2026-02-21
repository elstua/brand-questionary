"use client";

import { useRef, useCallback } from "react";
import { motion } from "motion/react";
import type { QuadrantConfig } from "@/types/questionnaire";

interface QuadrantMapProps {
  config: QuadrantConfig;
  value: string;
  onChange: (value: string) => void;
}

function parseValue(value: string): { x: number; y: number } | null {
  if (!value) return null;
  const [xStr, yStr] = value.split(",");
  const x = parseFloat(xStr);
  const y = parseFloat(yStr);
  if (isNaN(x) || isNaN(y)) return null;
  return { x, y };
}

function coordToPct(coord: number): number {
  return ((coord + 1) / 2) * 100;
}

export default function QuadrantMap({
  config,
  value,
  onChange,
}: QuadrantMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const point = parseValue(value);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      const clampedX = Math.max(-1, Math.min(1, x));
      const clampedY = Math.max(-1, Math.min(1, y));
      onChange(`${clampedX.toFixed(2)},${clampedY.toFixed(2)}`);
    },
    [onChange]
  );

  return (
    <div className="space-y-2">
      {/* Top label */}
      <div className="text-center text-sm font-medium text-zinc-500 dark:text-zinc-400">
        {config.topLabel}
      </div>

      <div className="flex items-center gap-2">
        {/* Left label */}
        <div className="w-16 shrink-0 text-right text-sm font-medium text-zinc-500 dark:text-zinc-400">
          {config.leftLabel}
        </div>

        {/* Map area */}
        <div
          ref={containerRef}
          onClick={handleClick}
          className="relative aspect-square w-full max-w-[320px] mx-auto cursor-crosshair rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 overflow-hidden"
        >
          {/* Grid lines */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-700" />
          <div className="absolute top-1/2 left-0 right-0 h-px bg-zinc-200 dark:bg-zinc-700" />

          {/* Reference markers */}
          {config.references?.map((ref) => (
            <div
              key={ref.label}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{
                left: `${coordToPct(ref.x)}%`,
                top: `${coordToPct(-ref.y)}%`,
              }}
            >
              <span className="text-[10px] font-medium text-zinc-400 dark:text-zinc-500 bg-zinc-50/80 dark:bg-zinc-900/80 px-1 rounded">
                {ref.label}
              </span>
            </div>
          ))}

          {/* User's selected point */}
          {point && (
            <motion.div
              className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
              initial={{ scale: 0 }}
              animate={{
                scale: 1,
                left: `${coordToPct(point.x)}%`,
                top: `${coordToPct(-point.y)}%`,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <div className="h-5 w-5 rounded-full bg-zinc-900 dark:bg-zinc-100 shadow-lg ring-2 ring-white dark:ring-zinc-900" />
            </motion.div>
          )}

          {/* Click hint */}
          {!point && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-xs text-zinc-400 dark:text-zinc-500">
                Click to place Char
              </span>
            </div>
          )}
        </div>

        {/* Right label */}
        <div className="w-16 shrink-0 text-left text-sm font-medium text-zinc-500 dark:text-zinc-400">
          {config.rightLabel}
        </div>
      </div>

      {/* Bottom label */}
      <div className="text-center text-sm font-medium text-zinc-500 dark:text-zinc-400">
        {config.bottomLabel}
      </div>
    </div>
  );
}
