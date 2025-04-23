export type LetterStatus = "correct" | "present" | "absent";

export interface LetterFeedback {
  letter: string;
  status: LetterStatus;
}
