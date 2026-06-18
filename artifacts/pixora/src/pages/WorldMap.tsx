import { Link, useLocation } from "wouter";
import { Lock } from "lucide-react";
import { motion } from "framer-motion";
import { WORLDS } from "@/data/challenges";
import { useGame } from "@/store/gameStore";
import { HUD } from "@/components/HUD";
import { BottomNav } from "@/components/BottomNav";

const WORLD_COLORS = ["#00FF41","#00CC33","#FFFFFF","#88FF88"];

export default function WorldMap() {
  const { state } = useGame();

  return (
    <div className="min-h-screen pb-28 pt-20 relative" style={{ background:"var(--px-bg)" }}>
      {/* Grid bg */}
      <div className="absolute inset-0 pointer-events-none opacity-4"
        style={{
          backgroundImage:"linear-gradient(var(--px-bg2) 1px,transparent 1px),linear-gradient(90deg,var(--px-bg2) 1px,transparent 1px)",
          backgroundSize:"24px 24px",
        }} />

      <HUD />

      <div className="max-w-md mx-auto px-4 py-4 relative z-10">

        {/* Header */}
        <motion.div className="text-center mb-8"
          initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }}>
          <div className="px-label mb-2" style={{ letterSpacing:3, color:"var(--px-gray)" }}>SELECT WORLD</div>
          <h1 className="px-title" style={{ fontSize:16, color:"var(--px-green)" }}>
            ADVENTURE MAP
          </h1>
          <div className="px-muted mt-1" style={{ fontSize:17 }}>◆ Restore the Crystal Memories ◆</div>
        </motion.div>

        {/* Worlds */}
        <div className="flex flex-col gap-5">
          {WORLDS.map((world, index) => {
            const isUnlocked = state.currentWorld >= world.id;
            const progress = state.worldProgress[world.id];
            const isCompleted = progress?.crystalEarned;
            const col = WORLD_COLORS[index % WORLD_COLORS.length];

            return (
              <motion.div key={world.id}
                initial={{ opacity:0, x: index%2===0 ? -30 : 30 }}
                animate={{ opacity:1, x:0 }}
                transition={{ delay: index*0.1 }}>
                {isUnlocked ? (
                  <Link href={`/world/${world.id}`}>
                    <motion.div
                      className="relative cursor-pointer"
                      style={{
                        background: "var(--px-bg2)",
                        border: `2px solid ${isCompleted ? col : "var(--px-green3)"}`,
                        boxShadow: isCompleted
                          ? `0 0 20px rgba(0,255,65,0.3), 4px 4px 0 var(--px-dark)`
                          : `4px 4px 0 var(--px-dark)`,
                        padding: "16px",
                      }}
                      whileHover={{ x: 4, boxShadow: `0 0 25px rgba(0,255,65,0.4), 4px 4px 0 var(--px-dark)` }}
                      whileTap={{ scale:0.97 }}>

                      {/* Top bar */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="px-label" style={{ fontSize:7, color: col }}>
                          WORLD {world.id}
                        </div>
                        {isCompleted && (
                          <div className="px-label" style={{ fontSize:7, color:"var(--px-green)", background:"var(--px-bg3)", padding:"2px 6px", border:"1px solid var(--px-green)" }}>
                            ◆ RESTORED
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-4">
                        {/* Icon box */}
                        <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center text-4xl"
                          style={{ background:"var(--px-bg3)", border:`2px solid ${col}` }}>
                          {world.icon}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <h2 style={{ fontFamily:"'Press Start 2P'", fontSize:10, color:"var(--px-white)", marginBottom:4, lineHeight:1.6 }}>
                            {world.name}
                          </h2>
                          <div className="px-muted" style={{ fontSize:17 }}>{world.theme}</div>

                          {/* Progress bars */}
                          {!isCompleted && (
                            <div className="flex gap-1 mt-2">
                              {[0,1,2].map(m => (
                                <div key={m} className="h-2 flex-1"
                                  style={{
                                    background: m < (progress?.missionsCompleted || 0)
                                      ? "var(--px-green)" : "var(--px-bg3)",
                                    border: "1px solid var(--px-green3)",
                                  }} />
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Arrow */}
                        <motion.div
                          style={{ fontFamily:"'Press Start 2P'", fontSize:14, color:"var(--px-green)", flexShrink:0 }}
                          animate={{ x:[0,4,0] }}
                          transition={{ duration:1.2, repeat:Infinity, ease:"linear" }}>
                          ▶
                        </motion.div>
                      </div>
                    </motion.div>
                  </Link>
                ) : (
                  <div style={{
                    background:"var(--px-bg)", border:"2px solid var(--px-bg3)",
                    boxShadow:"4px 4px 0 #000", padding:"16px", opacity:0.5,
                  }}>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 flex items-center justify-center"
                        style={{ background:"var(--px-bg2)", border:"2px solid var(--px-bg3)" }}>
                        <Lock size={24} style={{ color:"var(--px-green3)" }} />
                      </div>
                      <div>
                        <div className="px-label" style={{ fontSize:7, color:"var(--px-green3)" }}>WORLD {world.id}</div>
                        <div style={{ fontFamily:"'Press Start 2P'", fontSize:10, color:"var(--px-green3)", marginTop:4 }}>???</div>
                        <div className="px-muted" style={{ fontSize:16 }}>Complete prev. world</div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}

          {/* Trophy */}
          <motion.div className="text-center py-6"
            animate={{ y:[0,-4,0] }} transition={{ duration:2, repeat:Infinity, ease:"linear" }}>
            <div style={{ fontSize:40 }}>🏆</div>
            <div className="px-label mt-2" style={{ fontSize:7, color:"var(--px-gray)" }}>PIXORA CHAMPION</div>
          </motion.div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
