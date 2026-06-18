import { Heart, Zap, Gem } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "@/store/gameStore";
import { useAuth } from "@/store/authStore";
import { useEffect, useRef, useState } from "react";

export function HUD() {
  const { state } = useGame();
  const { user, openLoginModal } = useAuth();
  const crystalsEarned = Object.values(state.worldProgress).filter(w => w.crystalEarned).length;

  // Save flash indicator
  const [showSaved, setShowSaved] = useState(false);
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    setShowSaved(true);
    const t = setTimeout(() => setShowSaved(false), 1500);
    return () => clearTimeout(t);
  }, [state.totalXP, state.totalCorrectAnswers, crystalsEarned]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 p-3 pointer-events-none">
      <div className="max-w-md mx-auto flex items-center justify-between gap-2 pointer-events-auto">

        {/* Avatar / Login button */}
        <motion.button
          onClick={openLoginModal}
          className="flex items-center gap-1.5 px-2.5 py-2 rounded-2xl shadow-lg border border-white/20 flex-shrink-0"
          style={{
            background: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
          }}
          whileTap={{ scale: 0.92 }}
        >
          <span className="text-lg leading-none">{user ? user.avatar : "👤"}</span>
          {user ? (
            <span className="text-xs font-black text-gray-800 max-w-[56px] truncate">{user.name}</span>
          ) : (
            <span className="text-xs font-black text-gray-500">Login</span>
          )}
        </motion.button>

        {/* XP */}
        <motion.div
          className="flex items-center gap-1.5 px-3 py-2 rounded-2xl shadow-lg border border-white/30"
          style={{
            background: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 4px 15px rgba(255, 184, 77, 0.3), 0 1px 3px rgba(0,0,0,0.1)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Zap className="w-4 h-4 text-amber-500 fill-amber-400" />
          </motion.div>
          <motion.span
            key={state.totalXP}
            className="text-sm font-black text-gray-800 tracking-tight"
            initial={{ scale: 1.4, color: "#F59E0B" }}
            animate={{ scale: 1, color: "#1f2937" }}
            transition={{ duration: 0.4 }}
          >
            {state.totalXP}
          </motion.span>
          <span className="text-xs font-bold text-amber-400">XP</span>
        </motion.div>

        {/* Crystals */}
        <motion.div
          className="flex items-center gap-1.5 px-3 py-2 rounded-2xl shadow-lg border border-white/30"
          style={{
            background: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 4px 15px rgba(106, 92, 255, 0.25), 0 1px 3px rgba(0,0,0,0.1)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ y: [0, -2, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Gem className="w-4 h-4 text-violet-600 fill-violet-500" />
          </motion.div>
          <motion.span
            key={crystalsEarned}
            className="text-sm font-black text-gray-800 tracking-tight"
            initial={{ scale: 1.4, color: "#7C3AED" }}
            animate={{ scale: 1, color: "#1f2937" }}
            transition={{ duration: 0.4 }}
          >
            {crystalsEarned}
          </motion.span>
          <span className="text-xs font-bold text-violet-400">/4</span>
          <div className="flex gap-0.5 ml-1">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className={`w-1.5 h-1.5 rounded-sm rotate-45 ${i < crystalsEarned ? "bg-violet-500" : "bg-gray-200"}`}
                animate={i < crystalsEarned ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
        </motion.div>

        {/* Save flash */}
        <AnimatePresence>
          {showSaved && (
            <motion.div
              className="absolute top-2 right-3 px-2 py-1 rounded-xl text-[10px] font-black text-emerald-700 pointer-events-none"
              style={{ background: "rgba(255,255,255,0.95)", boxShadow: "0 2px 10px rgba(16,185,129,0.3)" }}
              initial={{ opacity: 0, y: -4, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4 }}
            >
              💾 Saved!
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
