import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Difficulty, ProblemType } from "../../types";
import { Dropdown } from "../Dropdown";

interface LandingViewProps {
  difficulty: Difficulty;
  type: ProblemType;
  isLoading: boolean;
  isGeneratingLoading: boolean;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onTypeChange: (type: ProblemType) => void;
  onGenerate: () => void;
}

export function LandingView({
  difficulty,
  type,
  isLoading,
  isGeneratingLoading,
  onDifficultyChange,
  onTypeChange,
  onGenerate,
}: LandingViewProps) {
  const difficulties = ["Easy", "Medium", "Hard"];
  const types = [
    "Random",
    "Addition",
    "Subtraction",
    "Multiplication",
    "Division",
  ];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
      >
        <div className="mt-8 flex justify-center items-center">
          <Image
            src="/images/cat-with-laptop.png"
            alt="Cat with laptop"
            width={500}
            height={500}
            priority
            className="w-full h-auto max-w-xs md:max-w-sm lg:max-w-md"
          />
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center mt-4 gap-6 sm:gap-8">
          <Dropdown
            value={difficulty}
            options={difficulties}
            onChange={(val) => onDifficultyChange(val as Difficulty)}
            disabled={isLoading}
          />
          <Dropdown
            value={type}
            options={types}
            onChange={(val) => onTypeChange(val as ProblemType)}
            disabled={isLoading}
          />
          <button
            onClick={onGenerate}
            disabled={isLoading}
            className="w-52 xxs:w-72 bg-secondary hover:bg-dim-secondary disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-xl transition duration-200 ease-in-out transform hover:scale-105 shadow-lg"
          >
            {isGeneratingLoading ? "Generating..." : "Generate New Problem"}
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
