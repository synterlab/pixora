import { Heart, Star, Gem } from "lucide-react";
import { useGame } from "@/store/gameStore";

export function HUD() {
  const { state } = useGame();
  
  const crystalsEarned = Object.values(state.worldProgress).filter(w => w.crystalEarned).length;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 p-4 pointer-events-none">
      <div className="max-w-md mx-auto flex items-center justify-between gap-2 pointer-events-auto">
        
        {/* Energy */}
        <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm border border-orange-100">
          <Heart className="w-4 h-4 text-red-500 fill-red-500 mr-1.5" />
          <span className="text-sm font-bold text-gray-800">5/5</span>
        </div>

        {/* Stars/XP */}
        <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm border border-orange-100">
          <Star className="w-4 h-4 text-secondary fill-secondary mr-1.5" />
          <span className="text-sm font-bold text-gray-800">{state.totalXP}</span>
        </div>

        {/* Crystals */}
        <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm border border-orange-100">
          <Gem className="w-4 h-4 text-accent fill-accent mr-1.5" />
          <span className="text-sm font-bold text-gray-800">{crystalsEarned}/4</span>
        </div>
        
      </div>
    </div>
  );
}
