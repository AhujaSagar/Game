import { LetterFeedback } from "../types";

export const checkGuess = (guess: string, solution: string): LetterFeedback[] => {
  const result: LetterFeedback[] = [];
  const solutionChars = solution.split("");

  const guessChars = guess.split("").map((letter, i) => {
    if (letter === solution[i]) {
      solutionChars[i] = ""; // mark matched
      return { letter, status: "correct" as const };
    }
    return null;
  });

  guessChars.forEach((entry, i) => {
    if (entry) {
      result[i] = entry;
    } else {
      const letter = guess[i];
      const indexInSolution = solutionChars.indexOf(letter);
      if (indexInSolution !== -1) {
        solutionChars[indexInSolution] = ""; // mark as used
        result[i] = { letter, status: "present" };
      } else {
        result[i] = { letter, status: "absent" };
      }
    }
  });

  return result;
};
