import { AnimatePresence, motion } from "framer-motion";
import { FaCheckCircle, FaRegClock } from "react-icons/fa";
import { FiXCircle } from "react-icons/fi";
import { GrHistory } from "react-icons/gr";
import { HistoryItem } from "../../types";

interface HistoryViewProps {
  historyData: HistoryItem[];
  isLoading: boolean;
  onClose: () => void;
}

export function HistoryView({
  historyData,
  isLoading,
  onClose,
}: HistoryViewProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col bg-white pb-3 rounded-xl shadow-lg w-full h-[80vh]"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <GrHistory className="text-purple-400 text-2xl" />
            <h2 className="text-2xl font-bold text-secondary">
              Problem History
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiXCircle className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400" />
            </div>
          ) : historyData.length === 0 ? (
            <div className="text-center py-12">
              <FaRegClock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No problem history yet</p>
              <p className="text-gray-400 text-sm mt-2">
                Start solving problems to see your history here
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {historyData.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-50 rounded-xl p-5 hover:shadow-lg hover:bg-dim-primary transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          item.difficulty_level === "Easy"
                            ? "bg-green-100 text-green-700"
                            : item.difficulty_level === "Medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.difficulty_level}
                      </span>
                      <span className="text-xs text-secondary font-extrabold">
                        {formatDate(item.created_at!)}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {item.problem_text}
                  </p>

                  {item.submissions && item.submissions.length > 0 ? (
                    <div className="border-t border-gray-200 pt-4 space-y-3">
                      {item.submissions.map((submission) => (
                        <div
                          key={submission.id}
                          className="flex items-start gap-3"
                        >
                          {submission.is_correct ? (
                            <FaCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          ) : (
                            <FiXCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                          )}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-semibold text-gray-700">
                                Your Answer: {submission.user_answer}
                              </span>
                              {!submission.is_correct && (
                                <span className="text-sm text-gray-500">
                                  (Correct: {item.correct_answer})
                                </span>
                              )}
                            </div>
                            {submission.feedback_text && (
                              <p className="text-sm text-gray-600 italic">
                                {submission.feedback_text}
                              </p>
                            )}
                            <span className="text-xs text-gray-400 mt-1 block">
                              {formatDate(submission.submitted_at)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="border-t border-gray-200 pt-4">
                      <p className="text-sm text-gray-500 italic">
                        Not attempted yet
                      </p>
                      <p className="text-sm text-gray-400 mt-1">
                        Correct Answer: {item.correct_answer}
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
