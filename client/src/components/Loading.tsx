import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

const LOADING_MESSAGES = [
  "Gabe Newell is counting your money... 💸",
  "Scanning your Steam library... 📚",
  "Dusting off unplayed games... 🧹",
  "Calculating shame levels... 😅",
  "Measuring financial waste... 💀",
  "Preparing your roast... 🔥",
  "Your wallet is filing for bankruptcy... 💳⚰️",
];

export default function Loading() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#171a21] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-cyan-900/20 animate-pulse" />

      <div className="text-center relative z-10">
        {/* Glowing Spinner */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="inline-block mb-12"
        >
          <Loader2 className="w-20 h-20 text-purple-500 drop-shadow-[0_0_25px_rgba(168,85,247,0.8)]" />
        </motion.div>

        {/* Rotating Messages */}
        <div className="h-20 flex items-center justify-center mb-8">
          <motion.p
            key={messageIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl text-gray-200 font-medium max-w-2xl px-4"
          >
            {LOADING_MESSAGES[messageIndex]}
          </motion.p>
        </div>

        {/* Glowing Progress Bar */}
        <div className="w-80 max-w-full h-2 bg-gray-800/50 rounded-full overflow-hidden mx-auto backdrop-blur-sm">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 shadow-[0_0_20px_rgba(168,85,247,0.8)]"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
          />
        </div>

        {/* Subtle Hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-gray-600 text-sm mt-8"
        >
          Loading... 🎮
        </motion.p>
      </div>
    </div>
  );
}
