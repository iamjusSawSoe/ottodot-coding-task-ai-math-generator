import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

interface DropdownProps {
  value: string;
  options: string[];
  onChange: (value: string) => void;
  disabled?: boolean;
  label?: string;
}

export function Dropdown({
  value,
  options,
  onChange,
  disabled = false,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-52 xxs:w-72 md:w-40">
      <button
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-secondary hover:bg-dim-secondary disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-xl transition duration-200 ease-in-out transform hover:scale-105 shadow-lg inline-flex items-center justify-between"
        type="button"
      >
        <span>{value}</span>
        <FaChevronDown
          className={`w-5 h-5 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute z-10 mt-2 w-full bg-white divide-y divide-gray-100 rounded-xl shadow-lg overflow-hidden"
          >
            <ul className="py-1 text-sm text-gray-700">
              {options.map((option) => (
                <li key={option}>
                  <button
                    onClick={() => {
                      onChange(option);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left block px-4 py-2.5 hover:bg-gray-100 transition duration-150 ${
                      value === option ? "bg-gray-50 font-semibold" : ""
                    }`}
                  >
                    {option}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
