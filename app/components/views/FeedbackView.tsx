import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

interface FeedbackViewProps {
  isCorrect: boolean;
  feedback: string;
  onAction: () => void;
}

export function FeedbackView({
  isCorrect,
  feedback,
  onAction,
}: FeedbackViewProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="mt-28 xs:mt-14 bg-gradient-secondary rounded-3xl shadow p-8 mx-2 xs:mx-8 md:mx-16 xl:mx-40 text-center text-white"
      >
        <div className="flex justify-center items-center">
          <Image
            src={
              isCorrect
                ? "/images/dog-correct.png"
                : "/images/dog-incorrect.png"
            }
            alt={isCorrect ? "Correct Answer" : "Incorrect Answer"}
            width={400}
            height={250}
            priority
            className="w-full h-auto max-w-xs md:max-w-sm lg:max-w-md"
          />
        </div>
        <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-8 flex flex-col sm:flex-row items-center justify-center gap-2 text-center">
          {isCorrect ? (
            <>
              <FaCheckCircle size={32} />
              Correct Answer!
            </>
          ) : (
            <>
              <FaTimesCircle size={32} />
              Wrong Answer!
            </>
          )}
        </h2>
        <p className="text-lg leading-relaxed">{feedback}</p>
        <div className="flex justify-center items-center mt-4">
          <button
            onClick={onAction}
            className="w-52 xxs:w-72 bg-secondary hover:bg-dim-secondary text-white font-bold py-3 px-4 rounded-xl transition duration-200 ease-in-out transform hover:scale-105 shadow-lg"
          >
            {isCorrect ? "Play Again..." : "Back to Answer"}
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
