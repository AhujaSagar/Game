import React, { useState } from "react";
import { checkGuess } from "./utils/checkGuess";
import { LetterFeedback } from "./types";

const SOLUTION = "REACT";

const keyboardLayout = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Back"]
];

export const WordleGame: React.FC = () => {
  const [guesses, setGuesses] = useState<LetterFeedback[][]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [error, setError] = useState("");

  const handleKey = (key: string) => {
    if (gameOver) return;
    setError("");

    if (key === "Back") {
      setCurrentGuess((prev) => prev.slice(0, -1));
    } else if (key === "Enter") {
      if (currentGuess.length !== 5) {
        setError("Guess must be 5 letters.");
        return;
      }
      const feedback = checkGuess(currentGuess, SOLUTION);
      const newGuesses = [...guesses, feedback];
      setGuesses(newGuesses);
      setCurrentGuess("");
      if (currentGuess === SOLUTION || newGuesses.length === 6) {
        setGameOver(true);
      }
    } else if (/^[A-Z]$/.test(key) && currentGuess.length < 5) {
      setCurrentGuess((prev) => prev + key);
    }
  };

  return (
    <div style={{ outline: "none", fontFamily: "sans-serif" }}>
      {guesses.map((guess, i) => (
        <div key={i} style={{ display: "flex", justifyContent: "center", margin: 5 }}>
          {guess.map((item, j) => (
            <div
              key={j}
              style={{
                width: 40,
                height: 40,
                margin: 2,
                lineHeight: "40px",
                textAlign: "center",
                color: "white",
                backgroundColor:
                  item.status === "correct"
                    ? "green"
                    : item.status === "present"
                    ? "gold"
                    : "gray"
              }}
            >
              {item.letter}
            </div>
          ))}
        </div>
      ))}

      {!gameOver && (
        <div style={{ display: "flex", justifyContent: "center", margin: 5 }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: 40,
                height: 40,
                margin: 2,
                lineHeight: "40px",
                textAlign: "center",
                border: "1px solid #ccc"
              }}
            >
              {currentGuess[i] || ""}
            </div>
          ))}
        </div>
      )}

      <div style={{ textAlign: "center", marginTop: 10, color: "red" }}>{error}</div>

      {gameOver && (
        <div style={{ textAlign: "center", marginTop: 10 }}>
          {guesses.some((g) => g.every((l) => l.status === "correct"))
            ? "🎉 You won!"
            : `😢 The word was ${SOLUTION}`}
        </div>
      )}

      <div style={{ marginTop: 20 }}>
        {keyboardLayout.map((row, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "center", margin: "4px 0" }}>
            {row.map((key) => (
              <button
                key={key}
                onClick={() => handleKey(key)}
                style={{
                  margin: 2,
                  padding: "10px 12px",
                  fontSize: 16,
                  borderRadius: 4,
                  cursor: "pointer"
                }}
              >
                {key}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
