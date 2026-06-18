import { useState } from "react";
import { useLocation, useParams } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { WORLDS } from "@/data/challenges";
import { useGame } from "@/store/gameStore";
import { HUD } from "@/components/HUD";
import { Pixo } from "@/components/Pixo";

type PixoMood = "Happy"|"Excited"|"Curious"|"Thinking"|"Celebrating"|"Neutral";

export default function Challenge() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const { state, answerQuestion, nextMission } = useGame();
  const worldId = parseInt(id ?? "1");
  const world = WORLDS.find(w => w.id === worldId);

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [pixoMood, setPixoMood] = useState<PixoMood>("Curious");
  const [showHint, setShowHint] = useState(false);

  if (!world) return <div className="flex items-center justify-center min-h-screen" style={{ background:"var(--px-bg)", fontFamily:"'Press Start 2P'", color:"var(--px-green)", fontSize:12 }}>
    WORLD NOT FOUND
  </div>;

  const progress = state.worldProgress[worldId];
  const missionIndex = progress?.missionsCompleted ?? 0;
  const mission = world.missions[missionIndex];
  const isWorldComplete = !mission || (progress?.crystalEarned ?? false);

  const handleAnswer = (idx: number) => {
    if (showResult) return;
    setSelectedAnswer(idx);
    setShowResult(true);
    const correct = idx === mission.correctIndex;
    setPixoMood(correct ? "Celebrating" : "Thinking");
    answerQuestion(worldId, correct, mission.xpReward);
  };

  const handleNext = () => {
    nextMission(worldId);
    setSelectedAnswer(null);
    setShowResult(false);
    setPixoMood("Curious");
    setShowHint(false);
    if (missionIndex + 1 >= world.missions.length) {
      setTimeout(() => setLocation("/map"), 300);
    }
  };

  if (isWorldComplete) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center" style={{ background:"var(--px-bg)" }}>
        <HUD />
        <Pixo mood="Celebrating" size="lg" />
        <div style={{ marginTop:24, fontFamily:"'Press Start 2P'", fontSize:11, color:"var(--px-white)", lineHeight:1.8 }}>
          WORLD {worldId}<br/>COMPLETE!
        </div>
        <div style={{ marginTop:8, fontFamily:"'Press Start 2P'", fontSize:9, color:"var(--px-green)" }}>
          ◆ Crystal Memory Restored!
        </div>
        <motion.button onClick={() => setLocation("/map")}
          className="px-btn-solid mt-8"
          style={{ fontSize:10, padding:"14px 24px", letterSpacing:2 }}
          animate={{ boxShadow:["0 0 10px var(--px-glow), 4px 4px 0 var(--px-dark)","0 0 30px rgba(0,255,65,0.7), 4px 4px 0 var(--px-dark)","0 0 10px var(--px-glow), 4px 4px 0 var(--px-dark)"] }}
          transition={{ duration:1.5, repeat:Infinity }}>
          ▶ BACK TO MAP
        </motion.button>
      </div>
    );
  }

  const isCorrect = selectedAnswer === mission.correctIndex;

  return (
    <div className="min-h-screen pb-10 pt-20 relative" style={{ background:"var(--px-bg)" }}>
      <div className="absolute inset-0 pointer-events-none opacity-4"
        style={{ backgroundImage:"linear-gradient(var(--px-bg2) 1px,transparent 1px),linear-gradient(90deg,var(--px-bg2) 1px,transparent 1px)", backgroundSize:"24px 24px" }} />
      <HUD />

      <div className="max-w-md mx-auto px-4 pt-4 relative z-10">

        {/* Back button */}
        <button onClick={() => setLocation("/map")}
          className="flex items-center gap-2 mb-4"
          style={{ fontFamily:"'Press Start 2P'", fontSize:8, color:"var(--px-green3)", background:"none", border:"none", cursor:"pointer", letterSpacing:1 }}>
          ◀ MAP
        </button>

        {/* World + mission header */}
        <div className="px-box mb-4 p-3 flex items-center gap-3">
          <div style={{ fontSize:28, flexShrink:0 }}>{world.icon}</div>
          <div>
            <div className="px-label" style={{ fontSize:7, color:"var(--px-green2)" }}>
              WORLD {worldId} — MISSION {missionIndex+1}/{world.missions.length}
            </div>
            <div style={{ fontFamily:"'Press Start 2P'", fontSize:9, color:"var(--px-white)", marginTop:3, lineHeight:1.6 }}>
              {world.name}
            </div>
          </div>
          {/* Progress dots */}
          <div className="ml-auto flex gap-1 flex-shrink-0">
            {world.missions.map((_,i) => (
              <div key={i} style={{
                width:8, height:8,
                background: i < missionIndex ? "var(--px-green)" : i === missionIndex ? "var(--px-green2)" : "var(--px-bg3)",
                border:"1px solid var(--px-green3)",
              }} />
            ))}
          </div>
        </div>

        {/* Pixo + hint */}
        <div className="flex items-end gap-4 mb-4">
          <Pixo mood={pixoMood} size="md" />
          <div className="flex-1">
            <button
              onClick={() => setShowHint(prev => !prev)}
              className="px-btn mb-2"
              style={{ fontSize:7, padding:"8px 12px", letterSpacing:1 }}>
              {showHint ? "▾ HIDE HINT" : "▸ ASK PIXO"}
            </button>
            <AnimatePresence>
              {showHint && (
                <motion.div className="px-box p-3"
                  initial={{ opacity:0, y:5 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}>
                  <div className="px-label" style={{ fontSize:7, color:"var(--px-green2)", marginBottom:4 }}>PIXO SAYS:</div>
                  <div className="px-body" style={{ fontSize:18, color:"var(--px-white)" }}>
                    {mission.hint}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Question */}
        <div className="px-box-glow p-4 mb-5">
          <div className="px-label mb-3" style={{ fontSize:7, color:"var(--px-green2)" }}>◆ QUESTION</div>
          <div style={{ fontFamily:"'Press Start 2P'", fontSize:10, color:"var(--px-white)", lineHeight:1.8 }}>
            {mission.question}
          </div>
        </div>

        {/* Answers */}
        <div className="flex flex-col gap-3 mb-6">
          {mission.options.map((opt, idx) => {
            const chosen = selectedAnswer === idx;
            const correct = idx === mission.correctIndex;
            const revealed = showResult;
            let borderColor = "var(--px-green3)";
            let bgColor = "var(--px-bg2)";
            let textColor = "var(--px-white)";
            let prefix = String.fromCharCode(65+idx);

            if (revealed && correct) { borderColor="var(--px-green)"; bgColor="var(--px-bg3)"; textColor="var(--px-green)"; prefix="✓"; }
            else if (revealed && chosen && !correct) { borderColor="#FF4444"; bgColor="#1a0000"; textColor="#FF4444"; prefix="✗"; }

            return (
              <motion.button key={idx}
                onClick={() => handleAnswer(idx)}
                disabled={showResult}
                whileTap={{ scale: showResult ? 1 : 0.97 }}
                style={{
                  background:bgColor, border:`2px solid ${borderColor}`,
                  padding:"12px 14px", textAlign:"left", cursor: showResult ? "default" : "pointer",
                  boxShadow: revealed && correct ? `0 0 15px rgba(0,255,65,0.4), 4px 4px 0 var(--px-dark)` : "4px 4px 0 var(--px-dark)",
                }}>
                <div className="flex items-start gap-3">
                  <span style={{ fontFamily:"'Press Start 2P'", fontSize:10, color:textColor, flexShrink:0, lineHeight:1.6 }}>
                    {prefix}
                  </span>
                  <span style={{ fontFamily:"'VT323'", fontSize:20, color:textColor, lineHeight:1.4 }}>
                    {opt}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Result & next */}
        <AnimatePresence>
          {showResult && (
            <motion.div className="px-box p-4 mb-4 text-center"
              style={{ borderColor: isCorrect ? "var(--px-green)" : "#FF4444",
                boxShadow: isCorrect ? "0 0 20px rgba(0,255,65,0.3), 4px 4px 0 var(--px-dark)" : "4px 4px 0 #330000" }}
              initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}>
              <div style={{ fontFamily:"'Press Start 2P'", fontSize:11, color: isCorrect ? "var(--px-green)" : "#FF4444", marginBottom:4 }}>
                {isCorrect ? "✓ CORRECT!" : "✗ WRONG"}
              </div>
              {isCorrect && (
                <div style={{ fontFamily:"'Press Start 2P'", fontSize:8, color:"var(--px-green2)" }}>
                  +{mission.xpReward} XP
                </div>
              )}
              <div className="px-body mt-2" style={{ fontSize:18, color:"var(--px-white)" }}>
                {mission.explanation}
              </div>
              <motion.button onClick={handleNext}
                className="px-btn-solid mt-4"
                style={{ fontSize:9, padding:"12px 24px", letterSpacing:2, display:"block", width:"100%" }}
                animate={{ boxShadow:["0 0 8px var(--px-glow), 4px 4px 0 var(--px-dark)","0 0 20px rgba(0,255,65,0.6), 4px 4px 0 var(--px-dark)","0 0 8px var(--px-glow), 4px 4px 0 var(--px-dark)"] }}
                transition={{ duration:1.2, repeat:Infinity }}>
                {missionIndex + 1 < world.missions.length ? "▶ NEXT MISSION" : "◆ CLAIM CRYSTAL"}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
