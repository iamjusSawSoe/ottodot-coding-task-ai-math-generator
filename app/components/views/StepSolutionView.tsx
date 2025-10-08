import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaCheckCircle, FaChevronRight, FaLightbulb } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

interface Step {
  step_number: number;
  title: string;
  explanation: string;
  calculation: string;
  result: string;
}

interface StepSolutionViewProps {
  problemId: string;
  onClose: () => void;
  onBack: () => void;
}

export default function StepSolutionView({
  problemId,
  onClose,
  onBack,
}: StepSolutionViewProps) {
  const [steps, setSteps] = useState<Step[]>([]);
  const [finalAnswer, setFinalAnswer] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const fetchSteps = async () => {
    try {
      setIsLoading(true);
      setError("");

      const res = await fetch("/api/getSteps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ problemId }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch solution steps");
      }

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setSteps(data.steps || []);
      setFinalAnswer(data.final_answer);
    } catch (err: any) {
      console.error("Fetch steps error:", err);
      setError(err.message || "Failed to load solution steps");
    } finally {
      setIsLoading(false);
    }
  };

  useState(() => {
    fetchSteps();
  });

  const nextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const previousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const showAllSteps = () => {
    setCurrentStepIndex(steps.length);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-2 xs:p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-xl xs:rounded-2xl shadow-2xl w-full max-w-3xl max-h-[95vh] xs:max-h-[90vh] overflow-hidden flex flex-col"
      >
        <div className="bg-gradient-to-r from-dim-secondary to-light-secondary p-4 xs:p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 xs:gap-3">
              <FaLightbulb className="text-xl xs:text-2xl md:text-3xl" />
              <h2 className="text-lg xs:text-xl md:text-2xl font-bold">
                Step-by-Step Solution
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 xs:p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <IoMdClose className="text-xl xs:text-2xl" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3 xs:p-4 sm:p-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 xs:h-12 xs:w-12 border-b-2 border-purple-500 mb-4" />
              <p className="text-sm xs:text-base text-gray-600">
                Loading solution steps...
              </p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 xs:p-6 text-center">
              <p className="text-sm xs:text-base text-red-600 font-semibold mb-4">
                {error}
              </p>
              <button
                onClick={fetchSteps}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 xs:px-6 rounded-lg transition-colors text-sm xs:text-base"
              >
                Try Again
              </button>
            </div>
          ) : steps.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-sm xs:text-base text-gray-500">
                No solution steps available
              </p>
            </div>
          ) : (
            <div className="space-y-4 xs:space-y-6">
              {/* Progress Indicators */}
              <div className="flex items-center justify-center gap-1 xs:gap-2 mb-4 xs:mb-6 overflow-x-auto pb-2">
                {steps.map((_, index) => (
                  <div key={index} className="flex items-center flex-shrink-0">
                    <div
                      className={`w-6 h-6 xs:w-8 xs:h-8 rounded-full flex items-center justify-center font-bold transition-all text-xs xs:text-sm ${
                        index <= currentStepIndex
                          ? "bg-purple-500 text-white"
                          : "bg-gray-200 text-gray-400"
                      }`}
                    >
                      {index + 1}
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`w-4 xs:w-8 h-1 transition-all ${
                          index < currentStepIndex
                            ? "bg-purple-500"
                            : "bg-gray-200"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Steps Display */}
              <AnimatePresence mode="wait">
                {currentStepIndex < steps.length ? (
                  <motion.div
                    key={currentStepIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-3 xs:space-y-4"
                  >
                    {/* Current Step */}
                    <div className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 rounded-lg xs:rounded-xl p-4 xs:p-6">
                      <div className="flex items-start gap-2 xs:gap-3 mb-3 xs:mb-4">
                        <div className="bg-purple-500 text-white w-8 h-8 xs:w-10 xs:h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0 text-sm xs:text-base">
                          {steps[currentStepIndex].step_number}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base xs:text-lg md:text-xl font-bold text-gray-800 mb-2">
                            {steps[currentStepIndex].title}
                          </h3>
                          <p className="text-sm xs:text-base text-gray-700 leading-relaxed mb-3 xs:mb-4">
                            {steps[currentStepIndex].explanation}
                          </p>

                          {steps[currentStepIndex].calculation !==
                            "No calculation needed for this step" && (
                            <div className="bg-white rounded-lg p-3 xs:p-4 mb-3 border-2 border-purple-100">
                              <p className="text-xs xs:text-sm text-gray-600 mb-1 font-semibold">
                                Calculation:
                              </p>
                              <p className="text-sm xs:text-base md:text-lg font-mono text-purple-600 font-bold break-all">
                                {steps[currentStepIndex].calculation}
                              </p>
                            </div>
                          )}

                          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-3 xs:p-4">
                            <p className="text-xs xs:text-sm text-gray-600 mb-1 font-semibold">
                              Result:
                            </p>
                            <p className="text-sm xs:text-base md:text-lg text-green-700 font-bold break-words">
                              {steps[currentStepIndex].result}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex flex-col xs:flex-row justify-between items-stretch xs:items-center gap-2 xs:gap-0 pt-2 xs:pt-4">
                      <button
                        onClick={previousStep}
                        disabled={currentStepIndex === 0}
                        className="bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 text-gray-700 font-bold py-2 px-4 xs:px-6 rounded-lg transition-colors text-sm xs:text-base order-2 xs:order-1"
                      >
                        Previous
                      </button>

                      <button
                        onClick={showAllSteps}
                        className="text-purple-600 hover:text-purple-700 font-semibold underline text-sm xs:text-base order-1 xs:order-2"
                      >
                        Show All Steps
                      </button>

                      <button
                        onClick={nextStep}
                        disabled={currentStepIndex === steps.length - 1}
                        className="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 disabled:text-gray-500 text-white font-bold py-2 px-4 xs:px-6 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm xs:text-base order-3"
                      >
                        Next Step
                        <FaChevronRight className="text-xs xs:text-sm" />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  /* All Steps View */
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-3 xs:space-y-4"
                  >
                    {steps.map((step, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 border-2 border-gray-200 rounded-lg xs:rounded-xl p-3 xs:p-5 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start gap-2 xs:gap-3">
                          <div className="bg-purple-500 text-white w-7 h-7 xs:w-8 xs:h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0 text-sm xs:text-base">
                            {step.step_number}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm xs:text-base md:text-lg font-bold text-gray-800 mb-1 xs:mb-2">
                              {step.title}
                            </h4>
                            <p className="text-xs xs:text-sm text-gray-700 mb-1 xs:mb-2">
                              {step.explanation}
                            </p>
                            {step.calculation !==
                              "No calculation needed for this step" && (
                              <p className="text-purple-600 font-mono text-xs xs:text-sm mb-1 break-all">
                                {step.calculation}
                              </p>
                            )}
                            <p className="text-green-700 font-semibold text-xs xs:text-sm break-words">
                              → {step.result}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Final Answer */}
                    {finalAnswer !== null && (
                      <div className="bg-gradient-to-r from-green-400 to-blue-400 rounded-lg xs:rounded-xl p-4 xs:p-6 text-white text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <FaCheckCircle className="text-xl xs:text-2xl md:text-3xl" />
                          <h3 className="text-lg xs:text-xl md:text-2xl font-bold">
                            Final Answer
                          </h3>
                        </div>
                        <p className="text-2xl xs:text-3xl md:text-4xl font-bold break-words">
                          {finalAnswer}
                        </p>
                      </div>
                    )}

                    <button
                      onClick={() => setCurrentStepIndex(0)}
                      className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2.5 xs:py-3 rounded-lg transition-colors text-sm xs:text-base"
                    >
                      Review Steps Again
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 p-3 xs:p-4 bg-gray-50">
          <button
            onClick={onBack}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2.5 xs:py-3 rounded-lg transition-colors text-sm xs:text-base"
          >
            Back to Problem
          </button>
        </div>
      </motion.div>
    </div>
  );
}
