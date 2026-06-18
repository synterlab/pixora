import { Link } from "wouter";
import { Lock } from "lucide-react";
import { motion } from "framer-motion";
import { WORLDS } from "@/data/challenges";
import { useGame } from "@/store/gameStore";
import { HUD } from "@/components/HUD";
import { BottomNav } from "@/components/BottomNav";
import { cn } from "@/lib/utils";

export default function WorldMap() {
  const { state } = useGame();

  return (
    <div className="min-h-screen bg-[#FFF8F0] pb-24 pt-20">
      <HUD />
      
      <div className="max-w-md mx-auto px-6 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">World Map</h1>
          <p className="text-gray-500 font-medium">Restore the Crystal Memories</p>
        </div>

        <div className="relative flex flex-col items-center gap-16 py-8">
          {/* Connecting Line */}
          <div className="absolute top-0 bottom-0 w-2 bg-orange-100 rounded-full left-1/2 -translate-x-1/2 z-0" />

          {WORLDS.map((world, index) => {
            const isUnlocked = state.currentWorld >= world.id;
            const progress = state.worldProgress[world.id];
            const isCompleted = progress?.crystalEarned;
            
            return (
              <div key={world.id} className="relative z-10 w-full flex justify-center">
                {isUnlocked ? (
                  <Link href={`/world/${world.id}`}>
                    <motion.div 
                      className="group cursor-pointer flex flex-col items-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className={cn(
                        "w-28 h-28 rounded-full flex items-center justify-center text-4xl shadow-xl relative border-4",
                        isCompleted ? "border-accent bg-white" : "border-primary bg-primary text-white",
                        !isCompleted && "animate-pulse-glow"
                      )}>
                        {isCompleted && (
                          <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white shadow-md">
                            💎
                          </div>
                        )}
                        {world.icon}
                      </div>
                      <div className="mt-4 bg-white px-4 py-2 rounded-xl shadow-sm border border-orange-100 text-center">
                        <h2 className="font-bold text-gray-800">{world.name}</h2>
                        <p className="text-xs text-gray-500">{world.theme}</p>
                      </div>
                    </motion.div>
                  </Link>
                ) : (
                  <div className="flex flex-col items-center opacity-50 grayscale">
                    <div className="w-24 h-24 rounded-full bg-gray-200 border-4 border-gray-300 flex items-center justify-center shadow-inner">
                      <Lock className="w-8 h-8 text-gray-400" />
                    </div>
                    <div className="mt-4 bg-gray-100 px-4 py-2 rounded-xl text-center">
                      <h2 className="font-bold text-gray-500">Locked</h2>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
