import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Pixo } from "@/components/Pixo";
import { useGame } from "@/store/gameStore";

export default function Intro() {
  const [, setLocation] = useLocation();
  const { state } = useGame();
  const hasProgress = state.totalXP > 0 || Object.keys(state.worldProgress).length > 0;
  const [modal, setModal] = useState<null | 'howToPlay' | 'about' | 'credits'>(null);

  const handleStart = () => setLocation("/map");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden"
      style={{ background: "var(--px-bg)" }}>

      {/* Pixel grid bg */}
      <div className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: "linear-gradient(var(--px-green3) 1px, transparent 1px), linear-gradient(90deg, var(--px-green3) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }} />

      {/* Corner brackets */}
      {[
        "top-0 left-0 border-t-2 border-l-2",
        "top-0 right-0 border-t-2 border-r-2",
        "bottom-0 left-0 border-b-2 border-l-2",
        "bottom-0 right-0 border-b-2 border-r-2",
      ].map((cls, i) => (
        <div key={i} className={`absolute w-16 h-16 pointer-events-none ${cls}`}
          style={{ borderColor: "rgba(0,255,65,0.25)" }} />
      ))}

      <div className="flex flex-col items-center w-full max-w-sm relative z-10">

        {/* Logo */}
        <div className="px-box-glow text-center mb-6 w-full py-5 px-6">
          <motion.h1 className="px-title" style={{ fontSize: 26, letterSpacing: 5 }}
            animate={{ color: ["#00FF41", "#FFFFFF", "#00FF41"] }}
            transition={{ duration: 2.5, repeat: Infinity }}>
            PIXORA
          </motion.h1>
          <div className="px-label mt-2" style={{ color: "var(--px-gray)", fontSize: 7, letterSpacing: 2 }}>
            ADVENTURES IN THE AGE OF AI
          </div>
        </div>

        {/* Pixo mascot */}
        <motion.div className="mb-5"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
          <Pixo mood="Excited" size="lg" />
        </motion.div>

        {/* Tagline */}
        <div className="px-box w-full p-4 mb-5 text-center">
          {hasProgress ? (
            <>
              <div className="px-body" style={{ fontSize: 20, color: "var(--px-white)" }}>
                Welcome back, Explorer!
              </div>
              <div className="px-label mt-1" style={{ fontSize: 7, color: "var(--px-green2)" }}>
                ⚡ {state.totalXP} XP EARNED
              </div>
            </>
          ) : (
            <div className="px-body" style={{ fontSize: 20, color: "var(--px-white)" }}>
              The Crystal Memories have been <span style={{ color: "#FF4444" }}>shattered!</span>
              <br />Can you restore them?
            </div>
          )}
        </div>

        {/* START / CONTINUE button */}
        <motion.button onClick={handleStart}
          className="px-btn-solid w-full mb-4"
          style={{ fontSize: 11, padding: "16px 0", letterSpacing: 3 }}
          whileTap={{ scale: 0.96 }}
          animate={{ boxShadow: [
            "0 0 10px rgba(0,255,65,0.4), 4px 4px 0 #003300",
            "0 0 30px rgba(0,255,65,0.8), 4px 4px 0 #003300",
            "0 0 10px rgba(0,255,65,0.4), 4px 4px 0 #003300",
          ]}}
          transition={{ duration: 1.5, repeat: Infinity }}>
          {hasProgress ? "▶ CONTINUE" : "▶ START GAME"}
        </motion.button>

        {/* Secondary buttons */}
        <div className="flex gap-2 w-full">
          {([
            ["🕹", "HOW TO", "howToPlay"],
            ["◈",  "ABOUT",  "about"],
            ["★",  "CREDITS","credits"],
          ] as const).map(([icon, label, key]) => (
            <button key={key}
              onClick={() => setModal(key as typeof modal)}
              className="px-btn flex-1 text-center"
              style={{ fontSize: 7, padding: "10px 4px", letterSpacing: 1 }}>
              {icon}<br />{label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Modal Overlay ── */}
      <AnimatePresence>
        {modal && (
          <motion.div className="pixora-modal-overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setModal(null)}>
            <div className="pixora-modal-sheet" onClick={e => e.stopPropagation()}>
              <div className="px-label mb-4" style={{ color: "var(--px-green3)", fontSize: 8 }}>
                ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
              </div>

              {modal === 'howToPlay' && (<>
                <div className="px-title-white mb-5" style={{ fontSize: 10 }}>HOW TO PLAY</div>
                <div className="space-y-3">
                  {[
                    ["▶", "Explore worlds on the Adventure Map"],
                    ["✦", "Answer AI questions → earn XP"],
                    ["◆", "Complete worlds → collect Crystal Memories"],
                    ["★", "Ask Pixo for hints anytime"],
                    ["♛", "Restore all 4 crystals → PIXORA Champion!"],
                  ].map(([icon, txt], i) => (
                    <div key={i} className="px-box-dim flex gap-3 p-3">
                      <span style={{ color: "var(--px-green)", fontFamily: "'Press Start 2P'", fontSize: 12, flexShrink: 0 }}>{icon}</span>
                      <span className="px-body" style={{ fontSize: 19, color: "var(--px-white)" }}>{txt}</span>
                    </div>
                  ))}
                </div>
              </>)}

              {modal === 'about' && (<>
                <div className="px-title-white mb-4" style={{ fontSize: 10 }}>ABOUT PIXORA</div>
                <div className="space-y-3">
                  <div className="px-box p-4">
                    <span className="px-body" style={{ color: "var(--px-white)", fontSize: 20 }}>
                      PIXORA is a mobile-first educational adventure game for kids aged 8–13 about Artificial Intelligence.
                    </span>
                  </div>
                  <div className="px-box-dim p-4 text-center">
                    <div className="px-label" style={{ color: "var(--px-gray)" }}>BUILT BY</div>
                    <div className="px-title-white mt-2" style={{ fontSize: 13 }}>SYNTERLAB</div>
                    <div className="px-muted" style={{ fontSize: 16 }}>playpixora.fun</div>
                  </div>
                  <div className="px-body text-center" style={{ color: "var(--px-gray)", fontSize: 17 }}>
                    Free · No ads · No purchases
                  </div>
                </div>
              </>)}

              {modal === 'credits' && (<>
                <div className="px-title-white mb-4" style={{ fontSize: 10 }}>CREDITS</div>
                <div className="space-y-2">
                  {[
                    ["GAME DESIGN", "Synterlab Team"],
                    ["ART + UI",    "Synterlab Design"],
                    ["AI CONTENT",  "Synterlab AI Lab"],
                    ["ENGINE",      "React + Vite"],
                    ["MASCOT",      "Pixo the AI Guide"],
                    ["DOMAIN",      "playpixora.fun"],
                  ].map(([role, name], i) => (
                    <div key={i} className="px-box-dim flex justify-between items-center p-3">
                      <span className="px-label" style={{ fontSize: 7, color: "var(--px-gray)" }}>{role}</span>
                      <span className="px-body" style={{ fontSize: 18, color: "var(--px-white)" }}>{name}</span>
                    </div>
                  ))}
                </div>
              </>)}

              <button onClick={() => setModal(null)}
                className="px-btn w-full mt-6"
                style={{ fontSize: 9, padding: "12px 0", letterSpacing: 2 }}>
                ✕ CLOSE
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
