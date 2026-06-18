import { Link } from "wouter";
import { Lock, Star, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { WORLDS } from "@/data/challenges";
import { useGame } from "@/store/gameStore";
import { HUD } from "@/components/HUD";
import { BottomNav } from "@/components/BottomNav";
import { cn } from "@/lib/utils";

const WORLD_THEMES = [
  { bg: "from-emerald-600 to-teal-800", shadow: "rgba(16,185,129,0.6)", ring: "border-emerald-400", badge: "bg-emerald-500" },
  { bg: "from-blue-600 to-indigo-800", shadow: "rgba(99,102,241,0.6)", ring: "border-blue-400", badge: "bg-blue-500" },
  { bg: "from-purple-600 to-violet-800", shadow: "rgba(139,92,246,0.6)", ring: "border-purple-400", badge: "bg-purple-500" },
  { bg: "from-indigo-600 to-blue-900", shadow: "rgba(67,56,202,0.6)", ring: "border-indigo-400", badge: "bg-indigo-500" },
];

const STAR_POSITIONS = Array.from({ length: 30 }, (_, i) => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 1,
  delay: Math.random() * 4,
  duration: Math.random() * 3 + 2,
}));

export default function WorldMap() {
  const { state } = useGame();

  return (
    <div className="min-h-screen pb-28 pt-20 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #0f172a 0%, #1e1b4b 40%, #0f2027 100%)" }}>

      {/* Starfield background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {STAR_POSITIONS.map((s, i) => (
          <motion.div key={i} className="absolute rounded-full bg-white"
            style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size }}
            animate={{ opacity: [0.15, 0.8, 0.15] }}
            transition={{ duration: s.duration, delay: s.delay, repeat: Infinity }}
          />
        ))}
        {/* Nebula glows */}
        <div className="absolute top-1/4 right-0 w-64 h-64 rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #6A5CFF, transparent)" }} />
        <div className="absolute bottom-1/3 left-0 w-64 h-64 rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #FF7A59, transparent)" }} />
      </div>

      <HUD />

      <div className="max-w-md mx-auto px-6 py-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="text-4xl mb-2"
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            🗺️
          </motion.div>
          <h1 className="text-3xl font-black text-white mb-1 tracking-tight"
            style={{ textShadow: "0 0 20px rgba(255,255,255,0.3), 0 2px 8px rgba(0,0,0,0.5)" }}>
            Adventure Map
          </h1>
          <p className="text-amber-300 font-bold text-sm"
            style={{ textShadow: "0 0 10px rgba(255,184,77,0.5)" }}>
            ✨ Restore the Crystal Memories ✨
          </p>
        </motion.div>

        {/* World path */}
        <div className="relative flex flex-col items-center gap-8 py-4">
          {/* Animated glowing path */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 z-0 flex flex-col items-center">
            <div className="w-1.5 h-full relative">
              <div className="absolute inset-0 rounded-full"
                style={{ background: "linear-gradient(to bottom, rgba(255,122,89,0.3), rgba(106,92,255,0.3), rgba(34,211,238,0.3))" }} />
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ background: "linear-gradient(to bottom, rgba(255,122,89,0.8), rgba(106,92,255,0.8), rgba(34,211,238,0.8))" }}
                animate={{ opacity: [0.4, 0.9, 0.4] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
              {/* Moving particle along path */}
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white"
                style={{ boxShadow: "0 0 10px rgba(255,255,255,0.8)" }}
                animate={{ top: ["0%", "100%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </div>

          {WORLDS.map((world, index) => {
            const isUnlocked = state.currentWorld >= world.id;
            const progress = state.worldProgress[world.id];
            const isCompleted = progress?.crystalEarned;
            const theme = WORLD_THEMES[index];

            return (
              <motion.div
                key={world.id}
                className="relative z-10 w-full flex justify-center"
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15, duration: 0.5, type: "spring" }}
              >
                {isUnlocked ? (
                  <Link href={`/world/${world.id}`}>
                    <motion.div
                      className="cursor-pointer"
                      whileHover={{ scale: 1.05, y: -4 }}
                      whileTap={{ scale: 0.93 }}
                    >
                      {/* World card */}
                      <div
                        className="relative flex items-center gap-4 px-5 py-4 rounded-3xl overflow-hidden"
                        style={{
                          background: "rgba(255,255,255,0.08)",
                          backdropFilter: "blur(12px)",
                          border: "1.5px solid rgba(255,255,255,0.15)",
                          boxShadow: isCompleted
                            ? `0 0 30px ${theme.shadow}, 0 8px 24px rgba(0,0,0,0.3)`
                            : `0 4px 20px rgba(0,0,0,0.3)`,
                          minWidth: 280,
                        }}
                      >
                        {/* Gradient side stripe */}
                        <div className={cn("absolute left-0 top-0 bottom-0 w-1.5 rounded-l-3xl bg-gradient-to-b", theme.bg)} />

                        {/* Glow overlay for active/incomplete */}
                        {!isCompleted && (
                          <motion.div
                            className={cn("absolute inset-0 opacity-10 bg-gradient-to-br", theme.bg)}
                            animate={{ opacity: [0.05, 0.15, 0.05] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        )}

                        {/* World icon bubble */}
                        <motion.div
                          className={cn("relative w-20 h-20 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0 bg-gradient-to-br", theme.bg)}
                          style={{
                            boxShadow: `0 0 20px ${theme.shadow}`,
                          }}
                          animate={!isCompleted ? { boxShadow: [`0 0 15px ${theme.shadow}`, `0 0 30px ${theme.shadow}`, `0 0 15px ${theme.shadow}`] } : {}}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <span className="text-4xl">{world.icon}</span>

                          {/* Completed crystal badge */}
                          {isCompleted && (
                            <motion.div
                              className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center text-sm shadow-lg"
                              style={{ boxShadow: "0 0 15px rgba(255,200,0,0.8)" }}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                              transition={{ type: "spring", bounce: 0.6, rotate: { duration: 2, repeat: Infinity } }}
                            >
                              💎
                            </motion.div>
                          )}
                        </motion.div>

                        {/* World info */}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={cn("text-[10px] font-black px-2 py-0.5 rounded-full text-white", theme.badge)}>
                              WORLD {world.id}
                            </span>
                            {isCompleted && (
                              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                                RESTORED!
                              </span>
                            )}
                          </div>
                          <h2 className="font-black text-white text-lg leading-tight">{world.name}</h2>
                          <p className="text-white/50 text-xs font-semibold mt-0.5">{world.theme}</p>

                          {/* Progress dots */}
                          {!isCompleted && (
                            <div className="flex gap-1.5 mt-2">
                              {[0, 1, 2].map(m => (
                                <div key={m}
                                  className={cn("h-1.5 rounded-full transition-all duration-500",
                                    m < (progress?.missionsCompleted || 0) ? cn("w-6", theme.badge) : "w-3 bg-white/20"
                                  )}
                                />
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Arrow */}
                        <motion.div
                          className="text-white/40 text-xl"
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.div>
                      </div>
                    </motion.div>
                  </Link>
                ) : (
                  <motion.div
                    className="opacity-40"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      backdropFilter: "blur(8px)",
                      border: "1.5px solid rgba(255,255,255,0.08)",
                      borderRadius: 24,
                      minWidth: 280,
                    }}
                  >
                    <div className="flex items-center gap-4 px-5 py-4">
                      <div className="w-20 h-20 rounded-2xl bg-gray-800/50 flex items-center justify-center flex-shrink-0">
                        <Lock className="w-8 h-8 text-gray-500" />
                      </div>
                      <div>
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-gray-700 text-gray-400">WORLD {world.id}</span>
                        <h2 className="font-black text-gray-500 text-lg mt-1">???</h2>
                        <p className="text-gray-600 text-xs font-semibold">Complete previous world</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}

          {/* End reward */}
          <motion.div
            className="relative z-10 flex flex-col items-center mt-4"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
              style={{
                background: "linear-gradient(135deg, rgba(255,200,0,0.2), rgba(255,122,89,0.2))",
                border: "2px solid rgba(255,200,0,0.3)",
                boxShadow: "0 0 30px rgba(255,200,0,0.3)",
              }}>
              🏆
            </div>
            <p className="text-amber-300/60 text-xs font-bold mt-2">PIXORA Champion</p>
          </motion.div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
