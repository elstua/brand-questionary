import type { Question } from "@/types/questionnaire";

export const QUESTIONS: Question[] = [
  // ── About Character ──────────────────────────────────────────────
  {
    id: "char-persona",
    section: "About Character",
    text: "If Char were a person in a meeting, who are they?",
    type: "text",
    placeholder:
      "e.g., the one who sends the perfect summary after / the sharp friend who catches what everyone missed / the quiet one in the corner who somehow knows everything",
  },
  {
    id: "elevator-pitch",
    section: undefined,
    text: "Someone at a party asks what Char does. You have 10 seconds. What do you say?",
    type: "text",
    placeholder: "Type your 10-second pitch...",
  },
  {
    id: "adjectives",
    text: "Pick three adjectives that Char should feel like. Now pick one that it should never feel like.",
    type: "multi_text",
    multiTextFields: [
      {
        label: "Adjective 1",
        placeholder: "Most important feel",
        draggable: true,
      },
      {
        label: "Adjective 2",
        placeholder: "Second feel",
        draggable: true,
      },
      {
        label: "Adjective 3",
        placeholder: "Third feel",
        draggable: true,
      },
      {
        label: "Never feel like",
        placeholder: "What Char should never be",
        variant: "negative",
        draggable: false,
      },
    ],
  },
  {
    id: "tool-or-notebook",
    text: "Is Char more like a tool in a workshop or a notebook in a pocket?",
    type: "slider",
    sliderConfig: {
      leftLabel: "Tool in a workshop",
      rightLabel: "Notebook in a pocket",
      centerLabel: "Somewhere in between",
    },
  },

  // ── About Tone & Voice ───────────────────────────────────────────
  {
    id: "funny-or-not",
    section: "About Tone & Voice",
    text: "Should Char's copy ever be funny or playful, or is that off-brand?",
    type: "choice_or_custom",
    choiceOrCustomOptions: [
      { label: "Yes, playful is on-brand" },
      { label: "No, keep it serious" },
      { label: "My answer", isCustom: true },
    ],
  },
  {
    id: "error-tone",
    text: "When a user hits an error or empty state, what's the tone?",
    type: "tone_cards",
    toneCardOptions: [
      {
        label: "Technical & informative",
        description: "Precise, functional, no fuss",
        mockupText: "No transcript found.",
      },
      {
        label: "Warm & human",
        description: "Friendly, encouraging, gentle",
        mockupText: "Nothing here yet — start a meeting to see your notes.",
      },
      {
        label: "Minimal & calm",
        description: "Quiet, understated, zen-like",
        mockupText: "No notes yet.",
      },
    ],
  },

  // ── About Positioning ────────────────────────────────────────────
  {
    id: "communicate-first",
    section: "About Positioning",
    text: "What matters more to communicate first? Rank these by writing them in order.",
    type: "multi_text",
    multiTextFields: [
      {
        label: "1st priority",
        placeholder: "Most important message",
        draggable: false,
      },
      {
        label: "2nd priority",
        placeholder: "Second message",
        draggable: false,
      },
      {
        label: "3rd priority",
        placeholder: "Third message",
        draggable: false,
      },
    ],
  },
  {
    id: "against-or-for",
    text: "Do you see Char as against something (cloud platforms, surveillance, vendor lock-in), or for something (ownership, simplicity, control) — or both? Which leads?",
    type: "text",
    placeholder: "Share your perspective...",
  },

  // ── About Preferences ────────────────────────────────────────────
  {
    id: "physical-object",
    section: "About Preferences",
    text: "You're designing a physical object that embodies Char. What is it?",
    type: "text",
    placeholder:
      "e.g., a Muji notebook, a Leica camera, a Dieter Rams radio, a Moleskine, a Field Notes pad",
  },
  {
    id: "dark-or-light",
    text: "Dark mode or light mode as the default brand expression?",
    type: "icon_choice",
    iconOptions: [
      { label: "Dark mode", icon: "🌙" },
      { label: "Light mode", icon: "☀️" },
    ],
  },
  {
    id: "design-or-engineering",
    text: "Do you want the brand to feel like it could be a design tool (Figma, Linear) or an engineering tool (terminal, Neovim) — or something in between?",
    type: "slider",
    sliderConfig: {
      leftLabel: "Design tool",
      rightLabel: "Engineering tool",
      centerLabel: "In between",
    },
  },
  {
    id: "tone-spectrum",
    text: "The developer audience responds to specific tones — think Linear's confident precision vs Notion's friendly approachability vs Obsidian's \"we trust you're smart.\" Where does Char sit on that spectrum?",
    type: "quadrant",
    quadrantConfig: {
      leftLabel: "Precise",
      rightLabel: "Warm",
      topLabel: "Opinionated",
      bottomLabel: "Empowering",
      references: [
        { label: "Linear", x: -0.6, y: 0.6 },
        { label: "Notion", x: 0.5, y: -0.3 },
        { label: "Obsidian", x: -0.4, y: -0.6 },
      ],
    },
  },

  // ── About Future ─────────────────────────────────────────────────
  {
    id: "future-vision",
    section: "About Future",
    text: "It's 2028. Char is successful. What does the brand represent beyond meeting notes?",
    type: "text",
    placeholder: "Describe your vision...",
  },
  {
    id: "brand-energy",
    text: "Is there any brand — in any industry — where you think \"that's the energy we want\"?",
    type: "text",
    placeholder: "Name a brand and what draws you to it...",
  },
];
