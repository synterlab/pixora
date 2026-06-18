import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "@/store/gameStore";
import { useAuth } from "@/store/authStore";
import { useEffect, useRef, useState } from "react";

export function HUD() {
  const { state } = useGame();
  const { user, openLoginModal } = useAuth();
  const crystalsEarned = Object.values(state.worldProgress).filter(w => w.crystalEarned).length;

  const [showSaved, setShowSaved] = useState(false);
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    setShowSaved(true);
    const t = setTimeout(() => setShowSaved(false), 1400);
    return () => clearTimeout(t);
  }, [state.totalXP, state.totalCorrectAnswers, crystalsEarned]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50" style={{ borderBottom:"2px solid var(--px-green3)", background:"rgba(0,0,0,0.97)" }}>
      <div className="max-w-md mx-auto flex items-center justify-between px-3 py-2 gap-2">

        {/* Login / avatar */}
        <button onClick={openLoginModal}
          className="flex items-center gap-1.5 flex-shrink-0"
          style={{ background:"var(--px-bg2)", border:"2px solid var(--px-green3)", padding:"4px 8px", boxShadow:"2px 2px 0 var(--px-dark)" }}>
          <span style={{ fontSize:16 }}>{user ? user.avatar : "👤"}</span>
          <span style={{ fontFamily:"'Press Start 2P'", fontSize:7, color:"var(--px-green)", maxWidth:52, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
            {user ? user.name : "LOGIN"}
          </span>
        </button>

        {/* XP */}
        <motion.div className="flex items-center gap-1"
          style={{ background:"var(--px-bg2)", border:"2px solid var(--px-green3)", padding:"4px 10px", boxShadow:"2px 2px 0 var(--px-dark)" }}>
          <span style={{ fontSize:14 }}>⚡</span>
          <motion.span key={state.totalXP}
            style={{ fontFamily:"'Press Start 2P'", fontSize:9, color:"var(--px-green)" }}
            initial={{ scale:1.4, color:"#FFFFFF" }} animate={{ scale:1, color:"var(--px-green)" }}
            transition={{ duration:0.3 }}>
            {state.totalXP}
          </motion.span>
          <span style={{ fontFamily:"'Press Start 2P'", fontSize:7, color:"var(--px-green3)" }}>XP</span>
        </motion.div>

        {/* Crystals */}
        <motion.div className="flex items-center gap-1"
          style={{ background:"var(--px-bg2)", border:"2px solid var(--px-green3)", padding:"4px 10px", boxShadow:"2px 2px 0 var(--px-dark)" }}>
          <span style={{ fontSize:14 }}>◆</span>
          <motion.span key={crystalsEarned}
            style={{ fontFamily:"'Press Start 2P'", fontSize:9, color:"var(--px-green)" }}
            initial={{ scale:1.4, color:"#FFFFFF" }} animate={{ scale:1, color:"var(--px-green)" }}
            transition={{ duration:0.3 }}>
            {crystalsEarned}
          </motion.span>
          <span style={{ fontFamily:"'Press Start 2P'", fontSize:7, color:"var(--px-green3)" }}>/4</span>
        </motion.div>

        {/* Save flash */}
        <AnimatePresence>
          {showSaved && (
            <motion.div
              className="absolute right-3 top-2"
              style={{ fontFamily:"'Press Start 2P'", fontSize:7, color:"var(--px-green)", background:"var(--px-bg)", border:"1px solid var(--px-green)", padding:"3px 6px" }}
              initial={{ opacity:0, y:-4 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}>
              ✓ SAVED
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
