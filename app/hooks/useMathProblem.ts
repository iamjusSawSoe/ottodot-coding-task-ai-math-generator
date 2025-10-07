import { useState } from "react";
import { Difficulty, MathProblem, ProblemType } from "../types";

export function useMathProblem() {
  const [problem, setProblem] = useState<MathProblem | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingLoading, setIsGeneratingLoading] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const generateProblem = async (difficulty: Difficulty, type: ProblemType) => {
    try {
      setIsLoading(true);
      setIsGeneratingLoading(true);
      setFeedback("");
      setUserAnswer("");
      setProblem(null);

      const res = await fetch("/api/generateProblem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ difficulty, type }),
      });

      if (!res.ok) {
        throw new Error(`Failed to generate problem. (${res.status})`);
      }

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setProblem(data.session);
      return { success: true };
    } catch (error) {
      console.error("GenerateProblem", error);
      setFeedback(
        "Something went wrong while generating a problem. Please try again."
      );
      return { success: false, error };
    } finally {
      setIsGeneratingLoading(false);
      setIsLoading(false);
    }
  };

  const submitAnswer = async (
    problemId: string,
    answer: string,
    difficulty: Difficulty,
    updateStats: (isCorrect: boolean) => void
  ) => {
    try {
      setIsLoading(true);

      const res = await fetch("/api/submitAnswer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: problemId, userAnswer: answer }),
      });

      if (!res.ok) {
        throw new Error(`Failed to submit answer. (${res.status})`);
      }

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      const correct = data.submission.is_correct;
      setIsCorrect(correct);
      setFeedback(data.submission.feedback_text);
      updateStats(correct);

      return { success: true, isCorrect: correct };
    } catch (error) {
      console.error("SubmitAnswer Error:", error);
      setFeedback(
        "Something went wrong while submitting your answer. Please try again."
      );
      setIsCorrect(false);
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setProblem(null);
    setFeedback("");
    setUserAnswer("");
    setIsCorrect(null);
  };

  return {
    problem,
    userAnswer,
    feedback,
    isLoading,
    isGeneratingLoading,
    isCorrect,
    setUserAnswer,
    generateProblem,
    submitAnswer,
    reset,
  };
}
