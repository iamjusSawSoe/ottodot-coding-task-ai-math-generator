import { useState } from "react";
import { Difficulty, Stats } from "../types";

export function useStats() {
  const [stats, setStats] = useState<Stats>({
    correct: 0,
    incorrect: 0,
    currentStreak: 0,
    bestStreak: 0,
    byDifficulty: { Easy: 0, Medium: 0, Hard: 0 },
  });

  const updateStats = (isCorrect: boolean, difficulty: Difficulty) => {
    setStats((prev) => {
      const newCorrect = isCorrect ? prev.correct + 1 : prev.correct;
      const newIncorrect = isCorrect ? prev.incorrect : prev.incorrect + 1;
      const newStreak = isCorrect ? prev.currentStreak + 1 : 0;
      const newBestStreak = Math.max(prev.bestStreak, newStreak);

      return {
        correct: newCorrect,
        incorrect: newIncorrect,
        currentStreak: newStreak,
        bestStreak: newBestStreak,
        byDifficulty: {
          ...prev.byDifficulty,
          [difficulty]: prev.byDifficulty[difficulty] + 1,
        },
      };
    });
  };

  return { stats, updateStats };
}
