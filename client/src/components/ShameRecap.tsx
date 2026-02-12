import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { ShameResponse } from "../types";
import {
  Flame,
  ChevronDown,
  Hamburger,
  Fuel,
  Coffee,
  Music,
  Clock,
} from "lucide-react";

interface ShameRecapProps {
  data: ShameResponse;
  onReset: () => void;
}

export default function ShameRecap({ data, onReset }: ShameRecapProps) {
  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory bg-[#171a21] scrollbar-hide">
      {/* SLIDE 1: Intro with Roast Message */}
      <IntroSlide data={data} />

      {/* SLIDE 2: THE MONEY (Animated Counter) */}
      <MoneySlide amount={data.stats.wastedMoneyUSD} />

      {/* SLIDE 3: Conversions Grid */}
      <ConversionsSlide conversions={data.conversions} />

      {/* SLIDE 4: Wall of Shame (Games Grid) */}
      <GamesSlide games={data.gamesList} onReset={onReset} />
    </div>
  );
}

// ========================================
// SLIDE 1: Intro with Typing Effect
// ========================================
function IntroSlide({ data }: { data: ShameResponse }) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  // Robust data extraction with nested fallbacks
  const roastMessage =
    (data as any)?.roastMessage ||
    (data as any)?.data?.roastMessage ||
    "No roast available.";
  const userName =
    (data as any)?.user?.name || (data as any)?.data?.user?.name || "Gamer";
  const userAvatar =
    (data as any)?.user?.avatar || (data as any)?.data?.user?.avatar || "";

  useEffect(() => {
    if (
      isInView &&
      !isTyping &&
      roastMessage &&
      roastMessage !== "No roast available."
    ) {
      setIsTyping(true);
      setDisplayedText("");

      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex <= roastMessage.length) {
          setDisplayedText(roastMessage.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
        }
      }, 30); // Typing speed

      return () => clearInterval(typingInterval);
    }
  }, [isInView, roastMessage, isTyping]);

  return (
    <section
      ref={ref}
      className="h-screen w-screen snap-start flex items-center justify-center relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-cyan-900/30" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.15),transparent_60%)]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center px-8 max-w-5xl relative z-10"
      >
        {/* Avatar with Glow */}
        {userAvatar && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-10"
          >
            <img
              src={userAvatar}
              alt={userName}
              className="w-48 h-48 rounded-full border-4 border-purple-500 shadow-[0_0_60px_rgba(168,85,247,0.8)] mx-auto"
            />
          </motion.div>
        )}

        {/* Username - FORCED WHITE WITH DROP SHADOW */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-6xl md:text-7xl font-black text-white drop-shadow-md mb-8 tracking-tight relative z-10"
          style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.8)" }}
        >
          {userName}
        </motion.h1>

        {/* Typing Roast Message - FORCED WHITE WITH DROP SHADOW */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-[#1b2838]/60 backdrop-blur-md border-2 border-purple-500/40 rounded-2xl p-10 min-h-[200px] flex items-center justify-center relative z-10"
        >
          <p
            className="text-2xl md:text-3xl text-white drop-shadow-md font-medium leading-relaxed relative z-10"
            style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.8)" }}
          >
            "{displayedText || roastMessage}"
            {displayedText && (
              <span className="inline-block w-1 h-8 bg-purple-500 ml-1 animate-pulse" />
            )}
          </p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16"
        >
          <ChevronDown className="w-10 h-10 text-gray-500 mx-auto animate-bounce" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ========================================
// SLIDE 2: Animated Money Counter
// ========================================
function MoneySlide({ amount }: { amount: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, amount, {
        duration: 2,
        ease: "easeOut",
      });

      return controls.stop;
    } else {
      count.set(0);
      setDisplayValue(0);
    }
  }, [isInView, amount, count]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (latest) => {
      setDisplayValue(latest);
    });
    return unsubscribe;
  }, [rounded]);

  return (
    <section
      ref={ref}
      className="h-screen w-screen snap-start flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#171a21] via-red-950/30 to-[#171a21]"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false }}
        className="text-center px-8"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          whileInView={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          viewport={{ once: false }}
        >
          <Flame className="w-24 h-24 text-orange-500 mx-auto mb-8 drop-shadow-[0_0_40px_rgba(251,146,60,0.9)]" />
        </motion.div>

        <h2 className="text-5xl md:text-6xl font-black text-white mb-12">
          FINANCIAL DAMAGE
        </h2>

        {/* Animated Counter */}
        <div className="relative">
          <motion.div
            className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 drop-shadow-[0_0_80px_rgba(239,68,68,0.9)] mb-8"
            style={{
              textShadow:
                "0 0 80px rgba(239, 68, 68, 0.8), 0 0 120px rgba(249, 115, 22, 0.6)",
            }}
          >
            ${displayValue.toLocaleString()}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1 }}
            viewport={{ once: false }}
            className="text-2xl text-gray-400"
          >
            wasted on unplayed games
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}

// ========================================
// SLIDE 3: Conversions Grid (2x2)
// ========================================
function ConversionsSlide({
  conversions,
}: {
  conversions: ShameResponse["conversions"];
}) {
  const items = [
    {
      icon: Hamburger,
      label: "Big Macs",
      value: conversions.bigMacs,
      emoji: "🍔",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Coffee,
      label: "Starbucks Lattes",
      value: conversions.starbucksCoffees,
      emoji: "☕",
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: Fuel,
      label: "Gallons of Gas",
      value: conversions.gasGallons,
      emoji: "⛽",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Music,
      label: "Spotify Months",
      value: conversions.spotifyMonths,
      emoji: "🎵",
      color: "from-pink-500 to-purple-600",
    },
  ];

  return (
    <section className="h-screen w-screen snap-start flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-purple-950/30 via-[#171a21] to-pink-950/30 p-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false }}
        className="text-center w-full max-w-6xl"
      >
        <h2 className="text-5xl md:text-6xl font-black text-white mb-16">
          WHAT YOU COULD'VE HAD
        </h2>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                delay: idx * 0.15,
                type: "spring",
                stiffness: 150,
              }}
              viewport={{ once: false }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="bg-[#1b2838]/80 backdrop-blur-md border-2 border-purple-500/30 rounded-3xl p-10 hover:border-purple-500/70 transition-all group"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-6xl">{item.emoji}</span>
                <item.icon className="w-12 h-12 text-purple-400 group-hover:text-purple-300 transition-colors" />
              </div>

              <div
                className={`text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r ${item.color} mb-4`}
              >
                {item.value.toLocaleString()}
              </div>

              <div className="text-xl text-gray-300 font-semibold">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ========================================
// SLIDE 4: Wall of Shame (Games Grid)
// ========================================
function GamesSlide({
  games,
  onReset,
}: {
  games: ShameResponse["gamesList"];
  onReset: () => void;
}) {
  const displayGames = games.slice(0, 40); // Limit for performance

  return (
    <section className="h-screen w-screen snap-start flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#171a21] via-purple-950/20 to-[#171a21] p-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false }}
        className="text-center w-full max-w-7xl h-full flex flex-col"
      >
        <h2 className="text-5xl md:text-6xl font-black text-white mb-8 flex items-center justify-center gap-4">
          <Flame className="w-14 h-14 text-orange-500" />
          THE WALL OF SHAME
        </h2>

        <p className="text-xl text-gray-400 mb-8">
          {games.length} games collecting digital dust
        </p>

        {/* Scrollable Games Grid with FULL PADDING (py for vertical space) */}
        <div className="flex-1 overflow-y-auto scrollbar-hide p-10">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 pb-4">
            {displayGames.map((game, idx) => (
              <motion.div
                key={game.appid}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.02 }}
                viewport={{ once: false, margin: "-100px" }}
                whileHover={{ scale: 1.08, y: -5 }}
                className="bg-[#1b2838]/90 backdrop-blur-sm border border-purple-500/20 rounded-xl p-4 hover:border-purple-500/60 transition-all group relative overflow-hidden"
              >
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-600/0 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative z-10">
                  <p className="text-sm text-gray-200 font-medium line-clamp-2 mb-3 min-h-[40px]">
                    {game.name}
                  </p>

                  {/* Playtime Badge */}
                  <div className="flex items-center gap-2 text-xs text-gray-500 group-hover:text-purple-400 transition-colors">
                    <Clock className="w-3 h-3" />
                    <span>{game.playtimeHours}h</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {games.length > 40 && (
          <p className="text-gray-500 mt-4 text-sm">
            ...and {games.length - 40} more games rotting away 💀
          </p>
        )}

        {/* Back to Top Button */}
        <motion.button
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: false }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onReset}
          className="mt-8 mx-auto px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 transition-all"
        >
          Start Over
        </motion.button>
      </motion.div>
    </section>
  );
}
