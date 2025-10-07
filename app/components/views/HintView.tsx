import { AnimatePresence, motion } from "framer-motion";
import { FiXCircle } from "react-icons/fi";
import { HiLightBulb } from "react-icons/hi";

interface HintViewProps {
  hintText: string;
  isLoading: boolean;
  onClose: () => void;
  onBack: () => void;
  onRetry?: () => void;
}

export function HintView({
  hintText,
  isLoading,
  onClose,
  onBack,
  onRetry,
}: HintViewProps) {
  const showRetry =
    hintText === "Unable to generate hint at this time. Please try again.";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
      >
        <div className="mt-6 mx-2 xs:mx-8 md:mx-16 xl:mx-40 rounded-xl p-4 shadow-lg bg-light-secondary">
          <div className="flex items-center justify-between border-b pb-3">
            <div className="flex items-center gap-3">
              <HiLightBulb className="text-purple-400 text-2xl" />
              <h2 className="text-2xl font-bold text-secondary">Hints</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 group/hint-close rounded-lg transition-colors"
            >
              <FiXCircle className="w-6 h-6 text-gray-600 group-hover/hint-close:text-dim-secondary" />
            </button>
          </div>
          <div className="mt-3 text-secondary">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400" />
              </div>
            ) : (
              <p className="leading-relaxed">{hintText}</p>
            )}
          </div>
        </div>
      </motion.div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-10 mt-6">
        <button
          onClick={onBack}
          disabled={isLoading}
          className="w-52 xxs:w-72 bg-secondary hover:bg-dim-secondary disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-xl transition duration-200 ease-in-out transform hover:scale-105 shadow-lg"
        >
          Back to Answer
        </button>
        {showRetry && onRetry && (
          <button
            onClick={onRetry}
            disabled={isLoading}
            className="w-52 xxs:w-72 bg-secondary hover:bg-dim-secondary disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-xl transition duration-200 ease-in-out transform hover:scale-105 shadow-lg"
          >
            Retry Hint
          </button>
        )}
      </div>
    </AnimatePresence>
  );
}
