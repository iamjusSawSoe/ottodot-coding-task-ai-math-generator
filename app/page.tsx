"use client";

import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { FaTrophy } from "react-icons/fa";
import { GrHistory } from "react-icons/gr";
import { IconButton } from "./components/IconButton";
import ScoreTracker from "./components/ScoreTracker";
import { AnswerForm } from "./components/views/AnswerForm";
import { ErrorView } from "./components/views/ErrorView";
import { FeedbackView } from "./components/views/FeedbackView";
import { HintView } from "./components/views/HintView";
import { HistoryView } from "./components/views/HistoryView";
import { LandingView } from "./components/views/LandingView";
import { ProblemDisplay } from "./components/views/ProblemDisplay";
import { useHints } from "./hooks/useHints";
import { useHistory } from "./hooks/useHistory";
import { useMathProblem } from "./hooks/useMathProblem";
import { useStats } from "./hooks/useStats";
import * as Types from "./types";

export default function Home() {
  const [difficulty, setDifficulty] = useState<Types.Difficulty>("Easy");
  const [type, setType] = useState<Types.ProblemType>("Random");
  const [showStats, setShowStats] = useState(false);
  const [isHistoryView, setIsHistoryView] = useState(false);
  const [isHintView, setIsHintView] = useState(false);
  const [feedbackView, setFeedbackView] = useState(false);
  const [errorView, setErrorView] = useState<Types.ErrorType>("");

  const {
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
  } = useMathProblem();

  const { stats, updateStats } = useStats();
  const {
    historyData,
    isLoading: isHistoryLoading,
    fetchHistory,
  } = useHistory();
  const { hintText, isLoadingHint, fetchHints, clearHint } = useHints();

  const handleGenerateProblem = async () => {
    setErrorView("");
    const result = await generateProblem(difficulty, type);
    if (!result.success) {
      setErrorView("Generate Error");
    }
  };

  const handleSubmitAnswer = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!problem) return;

    const result = await submitAnswer(
      problem.id,
      userAnswer,
      difficulty,
      (isCorrect) => updateStats(isCorrect, difficulty)
    );

    if (!result.success) {
      setErrorView("Submit Error");
    }
    setFeedbackView(true);
  };

  const handleBackToGenerate = () => {
    reset();
    setFeedbackView(false);
    setErrorView("");
    setType("Random");
  };

  const handleFetchHistory = async () => {
    const result = await fetchHistory();
    if (result.success) {
      setIsHistoryView(true);
    }
  };

  const handleFetchHints = async () => {
    if (!problem) return;
    setIsHintView(true);
    await fetchHints(problem.id);
  };

  const handleCloseHint = () => {
    setIsHintView(false);
    clearHint();
  };

  return (
    <div className="min-h-screen bg-primary py-10">
      <Toaster />
      <h1 className="font-extrabold text-center mb-8 text-secondary text-3xl xxs:text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
        Math Problem Generator
      </h1>

      <main className="relative rounded-2xl mx-auto max-w-[280px] xxs:max-w-xs xs:max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl xl:max-w-4xl bg-white">
        <div className={`${isHistoryView ? "" : "p-4"}`}>
          {/* History View */}
          {!isHistoryView && (
            <>
              <div className="absolute top-4 left-4">
                <IconButton
                  icon={<GrHistory />}
                  onClick={handleFetchHistory}
                  disabled={isLoading}
                  tooltip="Problem History"
                />
              </div>

              <div className="absolute top-4 left-16">
                <IconButton
                  icon={<FaTrophy />}
                  onClick={() => setShowStats(true)}
                  disabled={isLoading}
                  tooltip="Stats"
                />
              </div>
            </>
          )}
          {/* Status Badge */}
          {!isLoading && problem && !isHistoryView && (
            <div className="absolute flex flex-col xxs:flex-row justify-center items-center gap-4 top-4 right-4">
              <span className="inline-flex items-center rounded-lg bg-purple-400/10 px-2 py-1 text-lg font-medium text-purple-400 inset-ring inset-ring-purple-400/30">
                {type}
              </span>
              <span className="inline-flex items-center rounded-lg bg-purple-400/10 px-2 py-1 text-lg font-medium text-purple-400 inset-ring inset-ring-purple-400/30">
                {difficulty}
              </span>
            </div>
          )}

          {/* Landing View */}
          {!problem && !feedback && !isHistoryView && (
            <LandingView
              difficulty={difficulty}
              type={type}
              isLoading={isLoading}
              isGeneratingLoading={isGeneratingLoading}
              onDifficultyChange={setDifficulty}
              onTypeChange={setType}
              onGenerate={handleGenerateProblem}
            />
          )}

          {/* Problem View */}
          {problem && !feedbackView && !isHistoryView && (
            <>
              <ProblemDisplay
                problemText={problem.problem_text}
                difficulty={difficulty}
                type={type}
              />

              {isHintView ? (
                <HintView
                  hintText={hintText}
                  isLoading={isLoadingHint}
                  onClose={handleCloseHint}
                  onBack={handleCloseHint}
                  onRetry={() => problem && fetchHints(problem.id)}
                />
              ) : (
                <AnswerForm
                  userAnswer={userAnswer}
                  isLoading={isLoading}
                  onAnswerChange={setUserAnswer}
                  onSubmit={handleSubmitAnswer}
                  onBack={handleBackToGenerate}
                  onHintClick={handleFetchHints}
                />
              )}
            </>
          )}

          {/* Feedback View */}
          {feedback && feedbackView && !errorView && isCorrect !== null && (
            <FeedbackView
              isCorrect={isCorrect}
              feedback={feedback}
              onAction={
                isCorrect ? handleBackToGenerate : () => setFeedbackView(false)
              }
            />
          )}

          {/* Error View */}
          {errorView && (
            <ErrorView
              errorType={errorView}
              message={feedback}
              isLoading={isLoading}
              isGeneratingLoading={isGeneratingLoading}
              onRetry={handleGenerateProblem}
              onBack={() => {
                setFeedbackView(false);
                setErrorView("");
              }}
            />
          )}
        </div>

        {/* Stats Modal */}
        {showStats && (
          <ScoreTracker stats={stats} onClose={() => setShowStats(false)} />
        )}

        {/* History Modal */}
        {isHistoryView && !isHistoryLoading && (
          <HistoryView
            historyData={historyData}
            isLoading={isHistoryLoading}
            onClose={() => setIsHistoryView(false)}
          />
        )}
      </main>
    </div>
  );
}
