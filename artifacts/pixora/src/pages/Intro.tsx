import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Pixo } from "@/components/Pixo";
import { useGame } from "@/store/gameStore";

export default function Intro() {
  const [, setLocation] = useLocation();
  const { state, completeIntro } = useGame();
  const [step, setStep] = useState(0);
  const [modal, setModal] = useState<null | 'howToPlay' | 'about' | 'credits'>(null);

  useEffect(() => {
    if (state.introSeen) setLocation("/map");
  }, [state.introSeen, setLocation]);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 1200),
      setTimeout(() => setStep(2), 2800),
      setTimeout(() => setStep(3), 4200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleStart = () => { completeIntro(); setLocation("/map"); };
  if (state.introSeen) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden"
      style={{ background: "var(--px-bg)" }}>

      {/* Pixel grid bg */}
      <div className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: "linear-gradient(var(--px-green) 1px, transparent 1px), linear-gradient(90deg, var(--px-green) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }} />

      {/* Corner decorations */}
      {["top-0 left-0","top-0 right-0","bottom-0 left-0","bottom-0 right-0"].map((pos,i) => (
        <div key={i} className={`absolute ${pos} w-16 h-16 pointer-events-none`}
          style={{ border: "2px solid var(--px-green)", opacity: 0.3,
            borderRight: i%2===0?"none":"2px solid var(--px-green)",
            borderLeft: i%2===1?"none":"2px solid var(--px-green)",
            borderBottom: i<2?"none":"2px solid var(--px-green)",
            borderTop: i>=2?"none":"2px solid var(--px-green)",
          }} />
      ))}

      {/* Step 0: booting */}
      <AnimatePresence>
        {step === 0 && (
          <motion.div key="boot" exit={{ opacity: 0 }} className="text-center">
            <div className="px-label mb-6" style={{ fontSize: 10 }}>SYSTEM BOOT</div>
            <div className="px-body" style={{ color: "var(--px-green)", fontSize: 18 }}>
              {["Initializing AI core...", "Loading worlds...", "Waking up PIXO..."].map((txt, i) => (
                <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.3 }} className="mb-1">
                  <span style={{ color: "var(--px-green3)" }}>&gt; </span>{txt}
                  {i === 2 && <span className="px-blink">_</span>}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step 1: logo reveal */}
      <AnimatePresence>
        {step === 1 && (
          <motion.div key="logo" exit={{ opacity: 0, y: -20 }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }} className="text-center">
            <div className="px-box-glow inline-block px-8 py-6 mb-6">
              <motion.h1 className="px-title" style={{ fontSize: 28, letterSpacing: 6 }}
                animate={{ color: ["#00FF41","#FFFFFF","#00FF41"] }}
                transition={{ duration: 1.5, repeat: Infinity }}>
                PIXORA
              </motion.h1>
            </div>
            <div className="px-label" style={{ fontSize: 9, letterSpacing: 3, color: "var(--px-gray)" }}>
              ADVENTURES IN THE AGE OF AI
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step 2+: full intro */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.div key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }} className="flex flex-col items-center w-full max-w-sm">

            {/* Title box */}
            <div className="px-box-glow text-center mb-6 w-full py-4 px-6">
              <motion.h1 className="px-title" style={{ fontSize: 22, letterSpacing: 4 }}
                animate={{ color: ["#00FF41","#FFFFFF","#00FF41"] }}
                transition={{ duration: 2, repeat: Infinity }}>
                PIXORA
              </motion.h1>
              <div className="px-label mt-2" style={{ color: "var(--px-gray)", fontSize: 7, letterSpacing: 2 }}>
                ADVENTURES IN THE AGE OF AI
              </div>
            </div>

            {/* Pixo */}
            <motion.div className="mb-6"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}>
              <Pixo mood={step >= 3 ? "Excited" : "Curious"} size="lg" />
            </motion.div>

            {/* Message */}
            <AnimatePresence mode="wait">
              {step === 2 && (
                <motion.div key="m2" className="px-box w-full p-4 mb-6 text-center"
                  initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}>
                  <div className="px-body" style={{ color:"var(--px-green)", fontSize:20 }}>
                    The Crystal Memories<br/>have been <span style={{ color:"#FF4444" }}>shattered!</span>
                  </div>
                  <div className="px-muted mt-2" style={{ fontSize: 18 }}>Will you help restore them?</div>
                </motion.div>
              )}
              {step >= 3 && (
                <motion.div key="m3" className="px-box w-full p-4 mb-6 text-center"
                  initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}>
                  <div className="px-body" style={{ fontSize:20 }}>
                    Join <span style={{ color:"var(--px-white)", fontFamily:"'Press Start 2P'" }}>PIXO</span> on an epic AI adventure!
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* START button */}
            <motion.button onClick={handleStart}
              className="px-btn-solid w-full mb-4 text-center"
              style={{ fontSize: 12, padding: "16px 0", letterSpacing: 3 }}
              whileTap={{ scale: 0.96 }}
              animate={{ boxShadow: [
                "0 0 10px rgba(0,255,65,0.4), 4px 4px 0 #003300",
                "0 0 30px rgba(0,255,65,0.8), 4px 4px 0 #003300",
                "0 0 10px rgba(0,255,65,0.4), 4px 4px 0 #003300",
              ]}}
              transition={{ duration: 1.5, repeat: Infinity }}>
              ▶ START GAME
            </motion.button>

            {/* Secondary buttons */}
            <div className="flex gap-2 w-full">
              {([
                ["🕹", "HOW TO PLAY", "howToPlay"],
                ["◈", "ABOUT",       "about"],
                ["★", "CREDITS",     "credits"],
              ] as const).map(([icon, label, key]) => (
                <button key={key}
                  onClick={() => setModal(key as typeof modal)}
                  className="px-btn flex-1 text-center"
                  style={{ fontSize: 7, padding: "10px 4px", letterSpacing: 1 }}>
                  {icon}<br/>{label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Modal Overlay ── */}
      <AnimatePresence>
        {modal && (
          <motion.div className="pixora-modal-overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setModal(null)}>
            <div className="pixora-modal-sheet" onClick={e => e.stopPropagation()}>
              <div className="px-label mb-4" style={{ color:"var(--px-gray)", fontSize:8 }}>
                ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
              </div>

              {modal === 'howToPlay' && (<>
                <div className="px-title-white mb-6" style={{ fontSize:11 }}>HOW TO PLAY</div>
                <div className="space-y-3">
                  {[
                    ["▶","Explore worlds on the Adventure Map"],
                    ["✦","Answer AI questions → earn XP"],
                    ["◆","Complete worlds → collect Crystal Memories"],
                    ["★","Ask Pixo for hints anytime"],
                    ["♛","Restore all 4 crystals → PIXORA Champion!"],
                  ].map(([icon, txt], i) => (
                    <div key={i} className="px-box-dim flex gap-3 p-3">
                      <span style={{ color:"var(--px-green)", fontFamily:"'Press Start 2P'", fontSize:12, flexShrink:0 }}>{icon}</span>
                      <span className="px-body" style={{ fontSize:19, color:"var(--px-white)" }}>{txt}</span>
                    </div>
                  ))}
                </div>
              </>)}

              {modal === 'about' && (<>
                <div className="px-title-white mb-4" style={{ fontSize:11 }}>ABOUT PIXORA</div>
                <div className="space-y-3">
                  <div className="px-box p-4">
                    <span className="px-body" style={{ color:"var(--px-white)", fontSize:20 }}>
                      PIXORA is a mobile-first educational adventure game for kids aged 8–13 about Artificial Intelligence.
                    </span>
                  </div>
                  <div className="px-box-dim p-4 text-center">
                    <div className="px-label" style={{ color:"var(--px-gray)" }}>BUILT BY</div>
                    <div className="px-title-white mt-2" style={{ fontSize:14 }}>SYNTERLAB</div>
                    <div className="px-muted" style={{ fontSize:16 }}>playpixora.fun</div>
                  </div>
                  <div className="px-body text-center" style={{ color:"var(--px-gray)", fontSize:17 }}>
                    Free to play · No ads · No purchases
                  </div>
                </div>
              </>)}

              {modal === 'credits' && (<>
                <div className="px-title-white mb-4" style={{ fontSize:11 }}>CREDITS</div>
                <div className="space-y-2">
                  {[
                    ["GAME DESIGN","Synterlab Team"],
                    ["ART + UI","Synterlab Design"],
                    ["AI CONTENT","Synterlab AI Lab"],
                    ["ENGINE","React + Vite"],
                    ["MASCOT","Pixo the AI Guide"],
                    ["DOMAIN","playpixora.fun"],
                  ].map(([role,name],i) => (
                    <div key={i} className="px-box-dim flex justify-between items-center p-3">
                      <span className="px-label" style={{ fontSize:7, color:"var(--px-gray)" }}>{role}</span>
                      <span className="px-body" style={{ fontSize:18, color:"var(--px-white)" }}>{name}</span>
                    </div>
                  ))}
                </div>
              </>)}

              <button onClick={() => setModal(null)}
                className="px-btn w-full mt-6"
                style={{ fontSize:9, padding:"12px 0", letterSpacing:2 }}>
                ✕ CLOSE
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
