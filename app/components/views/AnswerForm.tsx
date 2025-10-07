import { useState } from "react";
import { HiLightBulb } from "react-icons/hi";
import { Tooltip } from "react-tooltip";

interface AnswerFormProps {
  userAnswer: string;
  isLoading: boolean;
  onAnswerChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
  onHintClick: () => void;
}

export function AnswerForm({
  userAnswer,
  isLoading,
  onAnswerChange,
  onSubmit,
  onBack,
  onHintClick,
}: AnswerFormProps) {
  const [isHintLoading, setIsHintLoading] = useState(false);

  const handleHintClick = async () => {
    setIsHintLoading(true);
    await onHintClick();
    setTimeout(() => setIsHintLoading(false), 500);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="mt-6 bg-white rounded-3xl shadow p-6 mb-6 mx-2 xs:mx-8 md:mx-16 xl:mx-40 relative">
        <div className="absolute top-1 right-1 xxs:top-4 xxs:right-4">
          <div
            onClick={isLoading || isHintLoading ? undefined : handleHintClick}
            className={`inline-flex items-center rounded-lg px-2 py-1 text-lg font-medium inset-ring inset-ring-purple-400/30 group/hint hint-element ${
              isLoading || isHintLoading
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-purple-400/10 cursor-pointer"
            }`}
          >
            {isHintLoading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-purple-400 border-t-transparent" />
            ) : (
              <HiLightBulb
                className={`text-2xl transition-colors ${
                  isLoading
                    ? "text-gray-400"
                    : "text-purple-400 group-hover/hint:text-secondary"
                }`}
              />
            )}
          </div>
        </div>
        {!isLoading && !isHintLoading && (
          <Tooltip anchorSelect=".hint-element" place="top">
            Hints
          </Tooltip>
        )}

        <label
          htmlFor="answer"
          className="block text-2xl font-bold text-secondary mb-4 text-center"
        >
          Your Answer:
        </label>
        <input
          type="number"
          id="answer"
          value={userAnswer}
          onChange={(e) => onAnswerChange(e.target.value)}
          className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-2xl focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition duration-200"
          placeholder="Enter your answer"
          required
          disabled={isLoading}
        />
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10">
        <button
          onClick={onBack}
          disabled={isLoading}
          type="button"
          className="w-52 xxs:w-72 bg-secondary hover:bg-dim-secondary disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-xl transition duration-200 ease-in-out transform hover:scale-105 shadow-lg"
        >
          Back to Generate Problem
        </button>
        <button
          type="submit"
          disabled={!userAnswer || isLoading}
          className="w-52 xxs:w-72 bg-blue-600 hover:bg-blue-500 text-white disabled:bg-gray-400 font-bold py-3 px-4 rounded-xl transition duration-200 ease-in-out transform hover:scale-105 shadow-lg"
        >
          {isLoading ? "Checking..." : "Submit Answer"}
        </button>
      </div>
    </form>
  );
}
