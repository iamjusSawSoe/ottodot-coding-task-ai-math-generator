import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { FaTimesCircle } from "react-icons/fa";
import { ErrorType } from "../../types";

interface ErrorViewProps {
  errorType: ErrorType;
  message: string;
  isLoading: boolean;
  isGeneratingLoading: boolean;
  onRetry: () => void;
  onBack: () => void;
}

export function ErrorView({
  errorType,
  message,
  isLoading,
  isGeneratingLoading,
  onRetry,
  onBack,
}: ErrorViewProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="mt-20 xxs:mt-12 xs:mt-14 bg-gradient-secondary rounded-3xl shadow p-8 mx-2 xs:mx-8 md:mx-16 xl:mx-40 text-center text-white"
      >
        <div className="flex justify-center items-center">
          <Image
            src="/images/error.png"
            alt="Error Occurred"
            width={400}
            height={250}
            priority
            className="w-full h-auto max-w-xs md:max-w-sm lg:max-w-md"
          />
        </div>
        <h2 className="text-md xs:text-xl sm:text-2xl md:text-4xl lg:text-5xl font-extrabold mb-8 flex items-center justify-center gap-2">
          <FaTimesCircle className="text-[20px] xxs:text-[36px]" />
          An Error Occurred!
        </h2>
        <p className="text-lg leading-relaxed">{message}</p>
        <div className="flex justify-center items-center mt-4">
          {errorType === "Submit Error" ? (
            <button
              onClick={onBack}
              className="w-36 xxs:w-52 sm:w-72 bg-secondary hover:bg-dim-secondary text-white font-bold py-3 px-4 rounded-xl transition duration-200 ease-in-out transform hover:scale-105 shadow-lg"
            >
              Back to Answer
            </button>
          ) : (
            <button
              onClick={onRetry}
              disabled={isLoading}
              className="w-52 sm:w-72 bg-secondary hover:bg-dim-secondary disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-xl transition duration-200 ease-in-out transform hover:scale-105 shadow-lg"
            >
              {isGeneratingLoading ? "Generating..." : "Retry Generate Problem"}
            </button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
