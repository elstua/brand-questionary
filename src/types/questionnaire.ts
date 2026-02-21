export type QuestionType =
  | "text"
  | "single"
  | "multiple"
  | "slider"
  | "quadrant"
  | "multi_text"
  | "tone_cards"
  | "icon_choice"
  | "choice_or_custom";

export interface SliderConfig {
  leftLabel: string;
  rightLabel: string;
  centerLabel?: string;
}

export interface QuadrantConfig {
  topLabel: string;
  bottomLabel: string;
  leftLabel: string;
  rightLabel: string;
  references?: { label: string; x: number; y: number }[];
}

export interface MultiTextField {
  label: string;
  placeholder?: string;
  variant?: "default" | "negative";
  draggable?: boolean;
}

export interface ToneCardOption {
  label: string;
  description: string;
  mockupText: string;
  isCustom?: boolean;
}

export interface IconOption {
  label: string;
  icon: string;
}

export interface ChoiceOrCustomOption {
  label: string;
  isCustom?: boolean;
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  section?: string;
  description?: string;
  placeholder?: string;
  options?: string[];
  sliderConfig?: SliderConfig;
  quadrantConfig?: QuadrantConfig;
  multiTextFields?: MultiTextField[];
  toneCardOptions?: ToneCardOption[];
  iconOptions?: IconOption[];
  choiceOrCustomOptions?: ChoiceOrCustomOption[];
}

export interface Answer {
  questionId: string;
  value: string | string[];
}

export interface Submission {
  answers: Answer[];
  submittedAt: string;
}
