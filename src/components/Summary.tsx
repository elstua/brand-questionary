"use client";

import { QUESTIONS } from "@/data/questions";
import type { Answer } from "@/types/questionnaire";

/* ── Raw response data ──────────────────────────────────────────────── */

const USER_LABELS = ["Yujong", "Harshika", "John"] as const;
const USER_COLORS = [
  { dot: "bg-blue-500", ring: "ring-blue-300", text: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-950/30", border: "border-blue-200 dark:border-blue-800" },
  { dot: "bg-amber-500", ring: "ring-amber-300", text: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-950/30", border: "border-amber-200 dark:border-amber-800" },
  { dot: "bg-emerald-500", ring: "ring-emerald-300", text: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-950/30", border: "border-emerald-200 dark:border-emerald-800" },
] as const;

const SUBMISSIONS: Answer[][] = [
  // ── User 1 ──
  [
    { questionId: "char-persona", value: "someone who never miss important details, and if I ask about it right after / or even after 1month, recall perfectly" },
    { questionId: "elevator-pitch", value: "opensource ai notepad you use for the meeting stuffs" },
    { questionId: "adjectives", value: ["Transparant", "Chill", "Reliable", "Complex"] },
    { questionId: "tool-or-notebook", value: "1" },
    { questionId: "funny-or-not", value: "Yes, playful is on-brand" },
    { questionId: "error-tone", value: "Warm & human" },
    { questionId: "communicate-first", value: ["Char is notepad you use for the meeting. not bot", "Char is open and transparent. You have full control", "Char is extensible. (prompt, template for now, but later extensions)"] },
    { questionId: "against-or-for", value: "Char gives you ownership and control." },
    { questionId: "physical-object", value: "notepad + colored index tab + monami pen" },
    { questionId: "dark-or-light", value: "Light mode" },
    { questionId: "design-or-engineering", value: "0" },
    { questionId: "tone-spectrum", value: "0.40,0.19" },
    { questionId: "future-vision", value: "suites of well-thought-out, transparent tools for various knowledge work tasks." },
    { questionId: "brand-energy", value: "zed.dev? actually our current landing page is almost copy of that" },
  ],
  // ── User 2 ──
  [
    { questionId: "char-persona", value: "Imagine you were responsible for taking minutes of the meeting but you are tired of back to back meetings. so Char is someone who steps up and takes the notes without taking the credit. As far as everyone else is concerned, the notes are yours." },
    { questionId: "elevator-pitch", value: "It's an AI notepad for meetings that lets you keep your data and choose your AI stack." },
    { questionId: "adjectives", value: ["Invisible/discreet", "Calm", "Reliable", "Intrusive"] },
    { questionId: "tool-or-notebook", value: "1" },
    { questionId: "funny-or-not", value: "Can be light-hearted, not \"trying\" to be funny" },
    { questionId: "error-tone", value: "Warm & human" },
    { questionId: "communicate-first", value: ["Ownership", "Control", "Simplicity"] },
    { questionId: "against-or-for", value: "Against lock-in" },
    { questionId: "physical-object", value: "Muji notebook" },
    { questionId: "dark-or-light", value: "Light mode" },
    { questionId: "design-or-engineering", value: "0" },
    { questionId: "tone-spectrum", value: "-0.33,0.44" },
    { questionId: "future-vision", value: "Leaving this question to the founders" },
    { questionId: "brand-energy", value: "Posthog" },
  ],
  // ── User 3 ──
  [
    { questionId: "char-persona", value: "Char is the person sitting right next to you who is speed-writing everything with extreme accuracy. They catch nuances, accents, jargon, and subtle context that others might miss. You can fully rely on them because they don't just record words \u2014 they understand what's actually being said. They feel like a \u201csuper intern,\u201d but in the best sense: highly dependable, context-aware, and quietly proactive. They're not just a passive note taker. They gently tap you on the shoulder when something important is missed, remind you of key action items, and even suggest smart follow-up questions or next steps during or after the meeting. After the meeting, they hand you concise, clear post-it style summaries: what happened, what matters, what you should do next. They might also brief you beforehand \u2014 who the person is, what to ask, and how to approach the conversation \u2014 helping you navigate the meeting more confidently. Most importantly, Char adapts to the user. Whether you're a founder, lawyer, finance professional, or designer, they act like a domain-aware assistant tailored to your context, not a generic recorder." },
    { questionId: "elevator-pitch", value: "Char is a meeting note-taking app that listens during your meetings, transcribes everything, and gives you clean summaries afterward so you don't miss anything." },
    { questionId: "adjectives", value: ["Invisible \u2014 it should feel present but unobtrusive, quietly doing its job without demanding attention.", "Calm \u2014 using Char should make you feel at ease, not anxious or overwhelmed during meetings.", "Confident \u2014 it should give you reassurance that everything is being captured and handled, so you don't have to worry about missing anything.", "Vibrant, flashy, or intrusive \u2014 it should never feel loud, neon, bold, or attention-seeking."] },
    { questionId: "tool-or-notebook", value: "1" },
    { questionId: "funny-or-not", value: "In short, Char should feel calm first, with gentle playfulness as a secondary layer, not the main personality." },
    { questionId: "error-tone", value: "Warm & human" },
    { questionId: "communicate-first", value: ["It just works \u2014 a magical, invisible experience that quietly delivers huge value. Char should feel robust, reliable, and \u201clegit\u201d from the first impression. After seeing the website or hearing about it, people should immediately think: this is real, this is trustworthy, and this will genuinely transform how I work in meetings and workflows.", "Ownership and control over data. Char is local-first, privacy-respecting, and flexible \u2014 users can use on-device models, bring their own keys, or integrate with enterprise infrastructure. The core perception should be: I fully own my data and my stack, and the product deeply respects that.", "Security, robustness, and long-term trust. The product should feel well-engineered, secure, and thoughtfully built (e.g., open source, Rust, privacy-conscious architecture). It should give the impression of being a dependable system of record \u2014 a source of truth or knowledge hub that individuals and even organizations can confidently rely on and share internally."] },
    { questionId: "against-or-for", value: "Char is primarily for something, not against something. It is for ownership, flexibility, and user control. Rather than being anti-cloud or anti-any specific approach, Char is designed to give users the best of both worlds \u2014 cloud, on-device models, bring-your-own-key setups, hosted versions, or even self-hosting. The philosophy is not to force one opinionated workflow, but to adapt to how different users and organizations want to operate. At the same time, Char quietly stands for people who have been underserved: users who care deeply about data ownership, file control, and transparent systems. Many existing tools are closed, rigid, and highly opinionated, which limits how much control users actually have over their data and stack. So the leading stance is: For ownership, openness, and flexibility. And secondarily: Against lock-in, rigid systems, and one-size-fits-all infrastructure \u2014 but without being ideological or anti-cloud." },
    { questionId: "physical-object", value: "If Char were a physical object, it would be a reMarkable tablet sitting quietly on your desk during a meeting \u2014 a notebook, pen, and voice recorder combined into one calm, focused tool. It's minimal, unobtrusive, and always present. You can jot things down, capture thoughts, and trust that everything is being recorded without distraction. After the meeting, it quietly turns your notes and recordings into a rich, structured summary, almost like magic. More than just a device, it feels like a digital extension of yourself \u2014 or a highly reliable note-taking companion \u2014 but embodied in a single, simple object that blends seamlessly into your workflow rather than interrupting it." },
    { questionId: "dark-or-light", value: "Light mode" },
    { questionId: "design-or-engineering", value: "-1" },
    { questionId: "tone-spectrum", value: "-0.44,-0.21" },
    { questionId: "future-vision", value: "By 2028, Char represents far more than meeting notes. It becomes an extension of your mind \u2014 a living memory system that understands your full context across meetings, conversations, documents, and workflows. Instead of being a passive recorder, Char evolves into a proactive, hyper-personalized executive assistant that quietly helps you think, decide, and get things done. It remembers what matters, improves over time, and gently nudges you with relevant insights, reminders, and next steps without ever feeling intrusive. At a team level, Char becomes a shared source of truth \u2014 a contextual intelligence layer that supports meetings, collaboration, and decision-making in real time. It can surface insights, provide context, and assist individuals differently based on their roles and needs, while remaining human-centric and respectful of privacy and ownership. Beyond software, the brand expands into a ubiquitous presence across devices \u2014 desktop, mobile, web, wearable, and potentially dedicated hardware \u2014 all delivering the same calm, invisible, and context-aware experience. Ultimately, Char represents calm intelligence: a trusted cognitive infrastructure that helps individuals and organizations think better, remember better, and operate with clarity, while maintaining full control over their data and stack." },
    { questionId: "brand-energy", value: "Claude. Apple. Toyota. Braun. Tissot." },
  ],
];

/* ── Helpers ─────────────────────────────────────────────────────────── */

function getAnswer(userIdx: number, questionId: string): string | string[] | undefined {
  return SUBMISSIONS[userIdx]?.find((a) => a.questionId === questionId)?.value;
}

function sliderLabel(val: string, questionId: string): string {
  const q = QUESTIONS.find((q) => q.id === questionId);
  if (!q?.sliderConfig) return val;
  const { leftLabel, centerLabel, rightLabel } = q.sliderConfig;
  if (val === "-1") return leftLabel;
  if (val === "0") return centerLabel ?? "In between";
  if (val === "1") return rightLabel;
  return val;
}

function coordToPct(coord: number): number {
  return ((coord + 1) / 2) * 100;
}

/* ── Section header ──────────────────────────────────────────────────── */

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-4 mt-14 mb-6 first:mt-0">
      <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 shrink-0">
        {title}
      </h2>
      <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-700" />
    </div>
  );
}

/* ── Question card wrapper ───────────────────────────────────────────── */

function QuestionCard({ questionId, children }: { questionId: string; children: React.ReactNode }) {
  const q = QUESTIONS.find((q) => q.id === questionId);
  if (!q) return null;
  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm p-6 sm:p-8 space-y-5 mb-6">
      <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
        {q.text}
      </h3>
      {children}
    </div>
  );
}

/* ── User badge ──────────────────────────────────────────────────────── */

function UserBadge({ idx }: { idx: number }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${USER_COLORS[idx].text}`}>
      <span className={`inline-block h-2 w-2 rounded-full ${USER_COLORS[idx].dot}`} />
      {USER_LABELS[idx]}
    </span>
  );
}

/* ── Text answer block ───────────────────────────────────────────────── */

function TextAnswers({ questionId }: { questionId: string }) {
  return (
    <div className="space-y-3">
      {SUBMISSIONS.map((_, idx) => {
        const val = getAnswer(idx, questionId);
        if (!val || typeof val !== "string") return null;
        return (
          <div key={idx} className={`rounded-xl border p-4 ${USER_COLORS[idx].bg} ${USER_COLORS[idx].border}`}>
            <UserBadge idx={idx} />
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap">
              {val}
            </p>
          </div>
        );
      })}
    </div>
  );
}

/* ── Multi-text answer (adjectives, priorities) ──────────────────────── */

function MultiTextAnswers({ questionId }: { questionId: string }) {
  const q = QUESTIONS.find((q) => q.id === questionId);
  const fields = q?.multiTextFields ?? [];

  return (
    <div className="space-y-3">
      {SUBMISSIONS.map((_, idx) => {
        const val = getAnswer(idx, questionId);
        if (!val || !Array.isArray(val)) return null;
        return (
          <div key={idx} className={`rounded-xl border p-4 ${USER_COLORS[idx].bg} ${USER_COLORS[idx].border}`}>
            <UserBadge idx={idx} />
            <div className="mt-3 flex flex-wrap gap-2">
              {val.map((item, i) => {
                const isNegative = fields[i]?.variant === "negative";
                return (
                  <span
                    key={i}
                    className={`inline-block rounded-lg px-3 py-1.5 text-sm font-medium ${
                      isNegative
                        ? "bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-400 line-through"
                        : "bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700"
                    }`}
                  >
                    {fields[i]?.label === "Never feel like" ? `\u2715 ${item}` : item}
                  </span>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── Slider answer ───────────────────────────────────────────────────── */

function SliderAnswers({ questionId }: { questionId: string }) {
  const q = QUESTIONS.find((q) => q.id === questionId);
  if (!q?.sliderConfig) return null;
  const { leftLabel, centerLabel, rightLabel } = q.sliderConfig;

  return (
    <div className="space-y-4">
      {/* Visual slider track with all users */}
      <div className="relative h-16 flex items-center px-3">
        {/* Track */}
        <div className="absolute left-3 right-3 h-1 rounded-full bg-zinc-200 dark:bg-zinc-700" />
        {/* Snap positions */}
        {[0, 0.5, 1].map((frac) => (
          <div
            key={frac}
            className="absolute h-2 w-2 rounded-full bg-zinc-300 dark:bg-zinc-600 -translate-x-1/2"
            style={{ left: `calc(12px + (100% - 24px) * ${frac})` }}
          />
        ))}
        {/* User dots */}
        {SUBMISSIONS.map((_, idx) => {
          const val = getAnswer(idx, questionId);
          if (typeof val !== "string") return null;
          const numVal = parseFloat(val);
          const frac = (numVal + 1) / 2;
          return (
            <div
              key={idx}
              className={`absolute h-5 w-5 rounded-full ${USER_COLORS[idx].dot} ring-2 ${USER_COLORS[idx].ring} -translate-x-1/2 z-10`}
              style={{ left: `calc(12px + (100% - 24px) * ${frac})`, top: `calc(50% - ${idx * 3}px)` }}
              title={`${USER_LABELS[idx]}: ${sliderLabel(val, questionId)}`}
            />
          );
        })}
      </div>
      <div className="flex justify-between text-xs text-zinc-500 dark:text-zinc-400 px-1">
        <span>{leftLabel}</span>
        {centerLabel && <span>{centerLabel}</span>}
        <span>{rightLabel}</span>
      </div>
      {/* Legend */}
      <div className="flex gap-4 flex-wrap">
        {SUBMISSIONS.map((_, idx) => {
          const val = getAnswer(idx, questionId);
          if (typeof val !== "string") return null;
          return (
            <span key={idx} className="flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-400">
              <span className={`inline-block h-2.5 w-2.5 rounded-full ${USER_COLORS[idx].dot}`} />
              {USER_LABELS[idx]}: <span className="font-medium">{sliderLabel(val, questionId)}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

/* ── Quadrant map overlay ────────────────────────────────────────────── */

function QuadrantOverlay({ questionId }: { questionId: string }) {
  const q = QUESTIONS.find((q) => q.id === questionId);
  if (!q?.quadrantConfig) return null;
  const { leftLabel, rightLabel, topLabel, bottomLabel, references } = q.quadrantConfig;

  return (
    <div className="space-y-2">
      {/* Top label */}
      <div className="text-center text-sm font-medium text-zinc-500 dark:text-zinc-400">
        {topLabel}
      </div>

      <div className="flex items-center gap-2">
        {/* Left label */}
        <div className="w-16 shrink-0 text-right text-sm font-medium text-zinc-500 dark:text-zinc-400">
          {leftLabel}
        </div>

        {/* Map */}
        <div className="relative aspect-square w-full max-w-[320px] mx-auto rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 overflow-hidden">
          {/* Grid lines */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-700" />
          <div className="absolute top-1/2 left-0 right-0 h-px bg-zinc-200 dark:bg-zinc-700" />

          {/* Reference markers */}
          {references?.map((ref) => (
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

          {/* User points */}
          {SUBMISSIONS.map((_, idx) => {
            const val = getAnswer(idx, questionId);
            if (typeof val !== "string" || !val.includes(",")) return null;
            const [xStr, yStr] = val.split(",");
            const x = parseFloat(xStr);
            const y = parseFloat(yStr);
            if (isNaN(x) || isNaN(y)) return null;
            return (
              <div
                key={idx}
                className={`absolute -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center`}
                style={{
                  left: `${coordToPct(x)}%`,
                  top: `${coordToPct(-y)}%`,
                }}
              >
                <div className={`h-5 w-5 rounded-full ${USER_COLORS[idx].dot} ring-2 ${USER_COLORS[idx].ring} shadow-lg`} />
                <span className={`mt-0.5 text-[10px] font-semibold ${USER_COLORS[idx].text}`}>
                  {USER_LABELS[idx]}
                </span>
              </div>
            );
          })}
        </div>

        {/* Right label */}
        <div className="w-16 shrink-0 text-left text-sm font-medium text-zinc-500 dark:text-zinc-400">
          {rightLabel}
        </div>
      </div>

      {/* Bottom label */}
      <div className="text-center text-sm font-medium text-zinc-500 dark:text-zinc-400">
        {bottomLabel}
      </div>
    </div>
  );
}

/* ── Consensus badge ─────────────────────────────────────────────────── */

function ConsensusBadge({ questionId }: { questionId: string }) {
  const values = SUBMISSIONS.map((_, idx) => {
    const v = getAnswer(idx, questionId);
    if (Array.isArray(v)) return JSON.stringify(v);
    return v;
  });
  const unique = new Set(values.filter(Boolean));
  if (unique.size === 1) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-[11px] font-semibold px-2.5 py-0.5">
        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        Full consensus
      </span>
    );
  }
  return null;
}

/* ── Main Summary component ──────────────────────────────────────────── */

export default function Summary() {
  // Group questions by section
  const sections: { title: string; questionIds: string[] }[] = [];
  let currentSection: string | undefined;

  for (const q of QUESTIONS) {
    if (q.section && q.section !== currentSection) {
      currentSection = q.section;
      sections.push({ title: q.section, questionIds: [] });
    }
    if (sections.length === 0) {
      sections.push({ title: "General", questionIds: [] });
    }
    sections[sections.length - 1].questionIds.push(q.id);
  }

  return (
    <div>
      {/* User legend */}
      <div className="mb-8 flex items-center justify-center gap-6">
        {USER_LABELS.map((label, idx) => (
          <span key={idx} className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            <span className={`inline-block h-3 w-3 rounded-full ${USER_COLORS[idx].dot}`} />
            {label}
          </span>
        ))}
      </div>

      {sections.map((section) => (
        <div key={section.title}>
          <SectionHeader title={section.title} />

          {section.questionIds.map((qId) => {
            const q = QUESTIONS.find((q) => q.id === qId);
            if (!q) return null;

            return (
              <QuestionCard key={qId} questionId={qId}>
                <ConsensusBadge questionId={qId} />

                {/* Text questions */}
                {(q.type === "text" || q.type === "choice_or_custom") && (
                  <TextAnswers questionId={qId} />
                )}

                {/* Multi-text questions */}
                {q.type === "multi_text" && (
                  <MultiTextAnswers questionId={qId} />
                )}

                {/* Slider questions */}
                {q.type === "slider" && (
                  <SliderAnswers questionId={qId} />
                )}

                {/* Quadrant map */}
                {q.type === "quadrant" && (
                  <QuadrantOverlay questionId={qId} />
                )}

                {/* Tone cards */}
                {q.type === "tone_cards" && (
                  <TextAnswers questionId={qId} />
                )}

                {/* Icon choice */}
                {q.type === "icon_choice" && (
                  <TextAnswers questionId={qId} />
                )}
              </QuestionCard>
            );
          })}
        </div>
      ))}
    </div>
  );
}
