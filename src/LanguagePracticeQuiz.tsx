// src/LanguagePracticeQuiz.tsx

import React, { useState } from "react";

interface QuizItem {
  phrase: string;
  options: string[];
  correctIndex: number;
}

const quizItems: QuizItem[] = [
  {
    phrase: "[translate:धन्यवाद]",
    options: ["Thank you", "Hello", "Goodbye", "Please"],
    correctIndex: 0,
  },
  {
    phrase: "[translate:感謝]",
    options: ["Gratitude", "Sadness", "Joy", "Anger"],
    correctIndex: 0,
  },
  {
    phrase: "[translate:شكرا]",
    options: ["Thanks", "Yes", "No", "Sorry"],
    correctIndex: 0,
  },
];

export const LanguagePracticeQuiz: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [complete, setComplete] = useState(false);

  function selectOption(index: number) {
    setSelected(index);
    if (index === quizItems[current].correctIndex) {
      setScore(s => s + 1);
    }
  }

  function nextQuestion() {
    setSelected(null);
    if (current + 1 < quizItems.length) {
      setCurrent(current + 1);
    } else {
      setComplete(true);
    }
  }

  if (complete) {
    return (
      <div style={{
        maxWidth: 400,
        margin: "30px auto",
        padding: 20,
        backgroundColor: "#e5f2ff",
        borderRadius: 16,
        textAlign: "center",
        fontFamily: "'Inter', sans-serif",
        color: "#2366bd",
      }}>
        <h3>Quiz Complete!</h3>
        <p>Your score: {score} / {quizItems.length}</p>
        <button
          onClick={() => {
            setCurrent(0);
            setScore(0);
            setComplete(false);
          }}
          style={{
            backgroundColor: "#2391ef",
            border: "none",
            borderRadius: 9,
            padding: "10px 24px",
            color: "#fff",
            cursor: "pointer",
            fontWeight: 600
          }}
        >
          Retry Quiz
        </button>
      </div>
    );
  }

  const question = quizItems[current];

  return (
    <div style={{
      maxWidth: 400,
      margin: "30px auto",
      padding: 20,
      backgroundColor: "#f0f8ff",
      borderRadius: 16,
      fontFamily: "'Inter', sans-serif",
      color: "#1b417d",
    }}>
      <h3 style={{ marginBottom: 20 }}>What does this mean?</h3>
      <div style={{
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 28,
        color: "#0f3057"
      }}>
        {question.phrase}
      </div>
      <div>
        {question.options.map((option, i) => (
          <button
            key={i}
            onClick={() => selectOption(i)}
            disabled={selected !== null}
            style={{
              display: "block",
              width: "100%",
              padding: "10px 12px",
              marginBottom: 14,
              backgroundColor: selected === i
                ? (i === question.correctIndex ? "#23efac" : "#ff6868")
                : "#e0e7ff",
              border: "none",
              borderRadius: 8,
              cursor: selected === null ? "pointer" : "default",
              fontWeight: 600,
              color: selected === i ? "#000" : "#1b417d"
            }}
          >
            {option}
          </button>
        ))}
      </div>
      {selected !== null && (
        <button
          onClick={nextQuestion}
          style={{
            padding: "9px 18px",
            marginTop: 10,
            backgroundColor: "#2391ef",
            border: "none",
            borderRadius: 8,
            color: "#fff",
            fontWeight: 700,
            cursor: "pointer"
          }}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default LanguagePracticeQuiz;
