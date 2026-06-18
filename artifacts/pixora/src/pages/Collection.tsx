import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { WORLDS } from "@/data/challenges";
import { useGame } from "@/store/gameStore";
import { HUD } from "@/components/HUD";
import { BottomNav } from "@/components/BottomNav";

export default function Collection() {
  const [, setLocation] = useLocation();
  const { state } = useGame();
  const totalXP = state.totalXP;
  const crystals = Object.values(state.worldProgress).filter(w => w.crystalEarned).length;

  const level = Math.max(1, Math.ceil(totalXP / 100));
  const nextLevelXP = level * 100;
  const progress = Math.min(100, (totalXP % 100) / 100 * 100);

  const RANKS = [
    { min:0, max:99,   label:"PIXEL CADET",  icon:"◦" },
    { min:100, max:199, label:"CIRCUIT SCOUT", icon:"◈" },
    { min:200, max:299, label:"AI EXPLORER",   icon:"◆" },
    { min:300, max:999, label:"PIXORA CHAMPION",icon:"★" },
  ];
  const rank = RANKS.find(r => totalXP >= r.min && totalXP <= r.max) ?? RANKS[RANKS.length-1];

  return (
    <div className="min-h-screen pb-28 pt-20 relative" style={{ background:"var(--px-bg)" }}>
      <div className="absolute inset-0 pointer-events-none opacity-4"
        style={{ backgroundImage:"linear-gradient(var(--px-bg2) 1px,transparent 1px),linear-gradient(90deg,var(--px-bg2) 1px,transparent 1px)", backgroundSize:"24px 24px" }} />
      <HUD />

      <div className="max-w-md mx-auto px-4 pt-4 relative z-10">

        {/* Back */}
        <button onClick={() => setLocation("/map")}
          style={{ fontFamily:"'Press Start 2P'", fontSize:8, color:"var(--px-green3)", background:"none", border:"none", cursor:"pointer", letterSpacing:1, marginBottom:16 }}>
          ◀ MAP
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="px-label mb-1" style={{ letterSpacing:3, color:"var(--px-gray)" }}>EXPLORER FILE</div>
          <h1 className="px-title" style={{ fontSize:12, color:"var(--px-green)" }}>COLLECTION</h1>
        </div>

        {/* Rank card */}
        <motion.div className="px-box-glow p-4 mb-5 text-center"
          initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}>
          <div style={{ fontSize:36, marginBottom:4 }}>{rank.icon}</div>
          <div style={{ fontFamily:"'Press Start 2P'", fontSize:10, color:"var(--px-white)", marginBottom:4 }}>{rank.label}</div>
          <div style={{ fontFamily:"'Press Start 2P'", fontSize:8, color:"var(--px-green)" }}>
            LVL {level} · {totalXP} XP
          </div>
          {/* XP bar */}
          <div className="mt-3" style={{ background:"var(--px-bg3)", border:"2px solid var(--px-green3)", height:12 }}>
            <motion.div
              style={{ height:"100%", background:"var(--px-green)" }}
              initial={{ width:0 }} animate={{ width:`${progress}%` }}
              transition={{ duration:1, ease:"easeOut" }} />
          </div>
          <div style={{ fontFamily:"'Press Start 2P'", fontSize:7, color:"var(--px-gray)", marginTop:4 }}>
            {totalXP}/{nextLevelXP} XP TO NEXT LEVEL
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          {[
            { icon:"⚡", val:totalXP, label:"TOTAL XP" },
            { icon:"◆", val:`${crystals}/4`, label:"CRYSTALS" },
            { icon:"✓", val:state.totalCorrectAnswers, label:"CORRECT" },
          ].map((stat,i) => (
            <motion.div key={i} className="px-box p-3 text-center"
              initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.1 }}>
              <div style={{ fontSize:20 }}>{stat.icon}</div>
              <div style={{ fontFamily:"'Press Start 2P'", fontSize:10, color:"var(--px-white)", marginTop:2 }}>{stat.val}</div>
              <div className="px-label mt-1" style={{ fontSize:6, color:"var(--px-gray)" }}>{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Crystal Memories */}
        <div className="px-label mb-3" style={{ fontSize:8, color:"var(--px-green2)", letterSpacing:2 }}>◆ CRYSTAL MEMORIES</div>
        <div className="flex flex-col gap-3 mb-8">
          {WORLDS.map((world, i) => {
            const earned = state.worldProgress[world.id]?.crystalEarned;
            return (
              <motion.div key={world.id}
                className={earned ? "px-box" : "px-box-dim"}
                style={{ padding:"12px 14px", opacity: earned ? 1 : 0.5 }}
                initial={{ opacity:0, x:-20 }} animate={{ opacity: earned?1:0.5, x:0 }} transition={{ delay:i*0.08 }}>
                <div className="flex items-center gap-4">
                  <div style={{ fontSize:28, flexShrink:0 }}>{world.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div style={{ fontFamily:"'Press Start 2P'", fontSize:8, color: earned?"var(--px-white)":"var(--px-green3)", lineHeight:1.6 }}>
                      {world.name}
                    </div>
                    <div className="px-label mt-1" style={{ fontSize:6, color:"var(--px-gray)" }}>{world.theme}</div>
                  </div>
                  <div style={{ fontFamily:"'Press Start 2P'", fontSize:16, flexShrink:0,
                    color: earned?"var(--px-green)":"var(--px-bg3)",
                    textShadow: earned?"0 0 15px var(--px-glow)":"none" }}>
                    {earned ? "◆" : "◇"}
                  </div>
                </div>
                {earned && (
                  <div style={{ marginTop:6, fontFamily:"'VT323'", fontSize:18, color:"var(--px-green2)" }}>
                    ✓ Memory Restored — {world.crystalName ?? "Crystal"}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* All complete */}
        {crystals === WORLDS.length && (
          <motion.div className="px-box-glow p-6 text-center mb-4"
            animate={{ boxShadow:["0 0 10px var(--px-glow), 4px 4px 0 var(--px-dark)","0 0 40px rgba(0,255,65,0.6), 4px 4px 0 var(--px-dark)","0 0 10px var(--px-glow), 4px 4px 0 var(--px-dark)"] }}
            transition={{ duration:2, repeat:Infinity }}>
            <div style={{ fontSize:40, marginBottom:8 }}>★</div>
            <div style={{ fontFamily:"'Press Start 2P'", fontSize:11, color:"var(--px-white)", lineHeight:2 }}>
              PIXORA CHAMPION!
            </div>
            <div className="px-body mt-2" style={{ color:"var(--px-green)", fontSize:20 }}>
              All crystals restored. The AI world is safe!
            </div>
          </motion.div>
        )}
      </div>
      <BottomNav />
    </div>
  );
}
