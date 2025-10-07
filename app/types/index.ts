export interface MathProblem {
  id: string;
  problem_text: string;
  correct_answer: number;
  difficulty_level?: string;
  created_at?: string;
}

export interface Submission {
  id: string;
  user_answer: number;
  is_correct: boolean;
  feedback_text: string;
  submitted_at: string;
}

export interface HistoryItem extends MathProblem {
  submissions?: Submission[];
}

export interface Stats {
  correct: number;
  incorrect: number;
  currentStreak: number;
  bestStreak: number;
  byDifficulty: {
    Easy: number;
    Medium: number;
    Hard: number;
  };
}

export type Difficulty = "Easy" | "Medium" | "Hard" | "";
export type ProblemType =
  | "Addition"
  | "Subtraction"
  | "Multiplication"
  | "Division"
  | "Random";
export type ErrorType = "Generate Error" | "Submit Error" | "";
