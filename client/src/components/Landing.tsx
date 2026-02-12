import { useState } from "react";
import { motion } from "framer-motion";
import { Skull, ArrowRight } from "lucide-react";

interface LandingProps {
  onSearch: (steamId: string) => void;
}

export default function Landing({ onSearch }: LandingProps) {
  const [steamId, setSteamId] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!steamId.trim()) {
      setError("Steam ID cannot be empty!");
      return;
    }

    if (!/^\d{17}$/.test(steamId.trim())) {
      setError("Invalid Steam ID! Must be 17 digits.");
      return;
    }

    setError("");
    onSearch(steamId.trim());
  };

  return (
    <div className="min-h-screen bg-[#171a21] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Cyberpunk Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-cyan-900/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.1),transparent_50%)]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl w-full relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-block mb-6"
          >
            <Skull className="w-24 h-24 text-purple-500 mx-auto drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-7xl font-black text-white mb-4 tracking-tight"
          >
            STEAM
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]">
              SHAME RECAP
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-gray-400 text-lg max-w-md mx-auto"
          >
            Find out how much money you wasted
            <br />
            on games you never played 💀
          </motion.p>
        </div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div>
            <label
              htmlFor="steamId"
              className="block text-sm font-medium text-gray-400 mb-2 uppercase tracking-wider"
            >
              Steam ID (64-bit)
            </label>
            <input
              id="steamId"
              type="text"
              value={steamId}
              onChange={(e) => setSteamId(e.target.value)}
              placeholder="76561198000000000"
              className="w-full px-6 py-4 bg-[#1b2838]/80 border-2 border-purple-500/30 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-all duration-300 text-lg backdrop-blur-sm"
            />
            {error && (
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-red-400 text-sm mt-2 flex items-center gap-2"
              >
                <span className="text-lg">⚠️</span> {error}
              </motion.p>
            )}
          </div>

          <motion.button
            type="submit"
            whileHover={{
              scale: 1.02,
              boxShadow: "0 0 30px rgba(168,85,247,0.6)",
            }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white font-bold rounded-lg text-xl shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 transition-all duration-300 flex items-center justify-center gap-3 group relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3">
              🔥 ROAST MY WALLET
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>
        </motion.form>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-center space-y-2"
        >
          <p className="text-gray-500 text-sm">
            Find your Steam ID at:{" "}
            <a
              href="https://steamid.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 underline transition-colors"
            >
              steamid.io
            </a>
          </p>
          <p className="text-gray-600 text-xs">
            ⚠️ Your profile must be public!
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
