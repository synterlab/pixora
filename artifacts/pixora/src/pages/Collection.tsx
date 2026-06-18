import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, BookOpen, Eye, Award, Zap, Sparkles } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { useGame } from "@/store/gameStore";
import { WORLDS } from "@/data/challenges";
import { cn } from "@/lib/utils";

const BADGES = [
  { id: "Explorer", name: "Explorer", icon: Eye, color: "text-sky-300", bg: "from-sky-500 to-cyan-600", glow: "rgba(14,165,233,0.5)" },
  { id: "Detective", name: "Detail Detective", icon: Sparkles, color: "text-violet-300", bg: "from-violet-500 to-purple-600", glow: "rgba(139,92,246,0.5)" },
  { id: "Truth Seeker", name: "Truth Seeker", icon: Shield, color: "text-emerald-300", bg: "from-emerald-500 to-teal-600", glow: "rgba(16,185,129,0.5)" },
  { id: "Scholar", name: "Scholar", icon: BookOpen, color: "text-amber-300", bg: "from-amber-500 to-orange-600", glow: "rgba(245,158,11,0.5)" },
  { id: "Guardian", name: "Guardian", icon: Award, color: "text-rose-300", bg: "from-rose-500 to-pink-600", glow: "rgba(244,63,94,0.5)" },
  { id: "Master", name: "Master", icon: Zap, color: "text-yellow-300", bg: "from-yellow-500 to-amber-600", glow: "rgba(234,179,8,0.5)" },
];

const CRYSTAL_COLORS = [
  { from: "from-emerald-400", to: "to-teal-500", glow: "rgba(16,185,129,0.7)", sparkle: "#10B981" },
  { from: "from-blue-400", to: "to-indigo-500", glow: "rgba(99,102,241,0.7)", sparkle: "#6366F1" },
  { from: "from-purple-400", to: "to-violet-500", glow: "rgba(139,92,246,0.7)", sparkle: "#8B5CF6" },
  { from: "from-orange-400", to: "to-rose-500", glow: "rgba(249,115,22,0.7)", sparkle: "#F97316" },
];

const STAR_DATA = Array.from({ length: 25 }, (_, i) => ({
  x: Math.random() * 100, y: Math.random() * 100,
  size: Math.random() * 2 + 1, delay: Math.random() * 4, duration: Math.random() * 3 + 2,
}));

export default function Collection() {
  const { state } = useGame();
  const [tab, setTab] = useState<"crystals" | "badges">("crystals");
  const [hoveredCrystal, setHoveredCrystal] = useState<number | null>(null);

  const crystalsEarnedCount = Object.values(state.worldProgress).filter(w => w.crystalEarned).length;
  const completionPercentage = Math.round((crystalsEarnedCount / 4) * 100);

  return (
    <div className="min-h-screen pb-28 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #0f172a 0%, #1e1b4b 40%, #0f2027 100%)" }}>

      {/* Starfield */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {STAR_DATA.map((s, i) => (
          <motion.div key={i} className="absolute rounded-full bg-white"
            style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size }}
            animate={{ opacity: [0.1, 0.7, 0.1] }}
            transition={{ duration: s.duration, delay: s.delay, repeat: Infinity }}
          />
        ))}
        <div className="absolute top-1/4 right-0 w-64 h-64 rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #6A5CFF, transparent)" }} />
      </div>

      <div className="max-w-md mx-auto px-4 pt-12 relative z-10">

        {/* Header */}
        <motion.div className="text-center mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-5xl mb-2">💎</div>
          <h1 className="text-3xl font-black text-white mb-1"
            style={{ textShadow: "0 0 20px rgba(255,255,255,0.3)" }}>My Collection</h1>

          {/* Circular progress */}
          <div className="flex items-center justify-center mt-6">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
                <motion.circle
                  cx="50" cy="50" r="40" fill="none"
                  stroke="url(#progressGrad)" strokeWidth="8"
                  strokeDasharray={`${completionPercentage * 2.51} 251`}
                  strokeLinecap="round"
                  initial={{ strokeDasharray: "0 251" }}
                  animate={{ strokeDasharray: `${completionPercentage * 2.51} 251` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FF7A59" />
                    <stop offset="50%" stopColor="#FFB84D" />
                    <stop offset="100%" stopColor="#6A5CFF" />
                  </linearGradient>
                </defs>
              </svg>
              {/* Glow ring */}
              <div className="absolute inset-2 rounded-full opacity-20 blur-md"
                style={{ background: "conic-gradient(from 0deg, #FF7A59, #FFB84D, #6A5CFF, transparent)" }} />
              <div className="absolute flex flex-col items-center">
                <motion.span
                  className="text-3xl font-black text-white"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                >
                  {completionPercentage}%
                </motion.span>
                <span className="text-[10px] text-white/50 font-black tracking-widest uppercase">Restored</span>
              </div>
            </div>
          </div>

          {crystalsEarnedCount === 4 && (
            <motion.div
              className="mt-4 px-4 py-2 rounded-full text-sm font-black text-yellow-300 inline-block"
              style={{ background: "rgba(255,200,0,0.15)", border: "1px solid rgba(255,200,0,0.3)", boxShadow: "0 0 20px rgba(255,200,0,0.2)" }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🏆 PIXORA Champion!
            </motion.div>
          )}
        </motion.div>

        {/* Tabs */}
        <div className="flex p-1.5 rounded-2xl mb-8"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
          {(["crystals", "badges"] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn("flex-1 py-3 text-sm font-black rounded-xl transition-all relative overflow-hidden", tab === t ? "text-white" : "text-white/30")}
            >
              {tab === t && (
                <motion.div
                  layoutId="tab-bg"
                  className="absolute inset-0 rounded-xl"
                  style={{ background: "linear-gradient(135deg, rgba(255,122,89,0.3), rgba(106,92,255,0.3))", border: "1px solid rgba(255,255,255,0.15)" }}
                />
              )}
              <span className="relative z-10">
                {t === "crystals" ? `💎 Crystals (${crystalsEarnedCount}/4)` : `🏅 Badges (${BADGES.length})`}
              </span>
            </button>
          ))}
        </div>

        {/* Crystals grid */}
        <AnimatePresence mode="wait">
          {tab === "crystals" && (
            <motion.div
              key="crystals"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-2 gap-4"
            >
              {WORLDS.map((world, i) => {
                const earned = state.worldProgress[world.id]?.crystalEarned;
                const theme = CRYSTAL_COLORS[i];
                const isHovered = hoveredCrystal === world.id;

                return (
                  <motion.div
                    key={world.id}
                    className="relative aspect-square rounded-3xl overflow-hidden cursor-pointer"
                    style={{
                      background: earned
                        ? "rgba(255,255,255,0.08)"
                        : "rgba(255,255,255,0.03)",
                      border: earned
                        ? `1.5px solid rgba(255,255,255,0.2)`
                        : "1.5px solid rgba(255,255,255,0.06)",
                      boxShadow: earned && isHovered ? `0 0 40px ${theme.glow}` : "none",
                    }}
                    whileHover={earned ? { scale: 1.04 } : {}}
                    onHoverStart={() => setHoveredCrystal(world.id)}
                    onHoverEnd={() => setHoveredCrystal(null)}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1, type: "spring" }}
                  >
                    {/* Glow background for earned */}
                    {earned && (
                      <motion.div
                        className={cn("absolute inset-0 opacity-20 bg-gradient-to-br", theme.from, theme.to)}
                        animate={{ opacity: [0.1, 0.25, 0.1] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                      />
                    )}

                    {/* Sparkle dots */}
                    {earned && [0, 1, 2].map(j => (
                      <motion.div key={j} className="absolute w-1 h-1 rounded-full"
                        style={{ background: theme.sparkle, left: `${20 + j * 30}%`, top: `${15 + j * 20}%` }}
                        animate={{ opacity: [0, 1, 0], scale: [0.5, 2, 0.5] }}
                        transition={{ duration: 2, delay: j * 0.7, repeat: Infinity }}
                      />
                    ))}

                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                      <motion.div
                        className={cn("text-5xl mb-3", earned ? "" : "grayscale opacity-30")}
                        animate={earned ? { y: [0, -5, 0], rotate: [0, 3, -3, 0] } : {}}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        {world.icon}
                      </motion.div>

                      {earned ? (
                        <>
                          <div className="text-3xl mb-1">💎</div>
                          <h3 className="font-black text-white text-xs text-center">{world.name}</h3>
                          <motion.span
                            className={cn("text-[10px] font-black mt-1 px-2 py-0.5 rounded-full text-white bg-gradient-to-r", theme.from, theme.to)}
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            RESTORED ✨
                          </motion.span>
                        </>
                      ) : (
                        <>
                          <h3 className="font-black text-white/20 text-xs text-center">{world.name}</h3>
                          <span className="text-[10px] text-white/20 font-bold mt-1">🔒 Locked</span>
                        </>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {tab === "badges" && (
            <motion.div
              key="badges"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-3 gap-4"
            >
              {BADGES.map((badge, i) => {
                const earned = state.badges.includes(badge.id);
                const Icon = badge.icon;
                return (
                  <motion.div
                    key={badge.id}
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.08, type: "spring" }}
                  >
                    <motion.div
                      className={cn("w-20 h-20 rounded-3xl flex items-center justify-center mb-2 relative overflow-hidden",
                        earned ? `bg-gradient-to-br ${badge.bg}` : "bg-white/5"
                      )}
                      style={earned ? { boxShadow: `0 0 25px ${badge.glow}, 0 4px 15px rgba(0,0,0,0.3)` } : {}}
                      whileHover={earned ? { scale: 1.1, rotate: 5 } : {}}
                      animate={earned ? {} : {}}
                    >
                      {earned && (
                        <motion.div
                          className="absolute inset-0"
                          style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.2), transparent)" }}
                          animate={{ opacity: [0.3, 0.6, 0.3] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                      <Icon size={32} className={earned ? "text-white drop-shadow-sm" : "text-white/15"} />
                      {earned && (
                        <motion.div
                          className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center text-[10px]"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", bounce: 0.6 }}
                        >
                          ✓
                        </motion.div>
                      )}
                    </motion.div>
                    <span className={cn("text-[10px] text-center font-black", earned ? "text-white/80" : "text-white/20")}>
                      {badge.name}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <BottomNav />
    </div>
  );
}
