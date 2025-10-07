import { AnimatePresence, motion } from "framer-motion";
import { FaChartLine, FaTrophy } from "react-icons/fa";
import { FiXCircle } from "react-icons/fi";

export default function ScoreTracker({ stats, onClose }) {
  const totalProblems = stats.correct + stats.incorrect;
  const accuracy =
    totalProblems > 0 ? Math.round((stats.correct / totalProblems) * 100) : 0;

  const getPerformanceMessage = () => {
    if (totalProblems === 0)
      return "Start solving problems to track your progress!";
    if (accuracy >= 80) return "Excellent work! Keep it up!";
    if (accuracy >= 60) return "Good job! You're doing great!";
    if (accuracy >= 40) return "Keep practicing! You're improving!";
    return "Don't give up! Practice makes perfect!";
  };

  const getStreakEmoji = () => {
    if (stats.currentStreak >= 5) return "🔥";
    if (stats.currentStreak >= 3) return "⚡";
    return "✨";
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-4 xxs:p-8 "
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <FaTrophy className="text-yellow-500 text-3xl" />
              <h2 className="text-3xl font-bold text-secondary">Your Stats</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FiXCircle className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Performance Message */}
          <div className="bg-gradient-secondary text-white rounded-2xl p-4 mb-6 text-center">
            <p className="text-lg font-semibold">{getPerformanceMessage()}</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-green-600">
                {stats.correct}
              </div>
              <div className="text-sm text-green-700 font-medium">Correct</div>
            </div>

            <div className="bg-red-50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-red-600">
                {stats.incorrect}
              </div>
              <div className="text-sm text-red-700 font-medium">Incorrect</div>
            </div>

            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-blue-600">
                {totalProblems}
              </div>
              <div className="text-sm text-blue-700 font-medium">Total</div>
            </div>

            <div className="bg-purple-50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-purple-600">
                {accuracy}%
              </div>
              <div className="text-sm text-purple-700 font-medium">
                Accuracy
              </div>
            </div>
          </div>

          {/* Current Streak */}
          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{getStreakEmoji()}</span>
                <div>
                  <div className="text-sm text-gray-600 font-medium">
                    Current Streak
                  </div>
                  <div className="text-2xl font-bold text-orange-600">
                    {stats.currentStreak}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600 font-medium">
                  Best Streak
                </div>
                <div className="text-2xl font-bold text-gray-700">
                  {stats.bestStreak}
                </div>
              </div>
            </div>
          </div>

          {/* Difficulty Breakdown */}
          {(stats.byDifficulty.Easy > 0 ||
            stats.byDifficulty.Medium > 0 ||
            stats.byDifficulty.Hard > 0) && (
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <FaChartLine className="text-purple-400" />
                Problems by Difficulty
              </h3>
              <div className="space-y-2">
                {stats.byDifficulty.Easy > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Easy</span>
                    <span className="text-sm font-semibold text-green-600">
                      {stats.byDifficulty.Easy}
                    </span>
                  </div>
                )}
                {stats.byDifficulty.Medium > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Medium</span>
                    <span className="text-sm font-semibold text-yellow-600">
                      {stats.byDifficulty.Medium}
                    </span>
                  </div>
                )}
                {stats.byDifficulty.Hard > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Hard</span>
                    <span className="text-sm font-semibold text-red-600">
                      {stats.byDifficulty.Hard}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
