import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, BookOpen, Eye, Award, Zap, Sparkles } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { useGame } from "@/store/gameStore";
import { WORLDS } from "@/data/challenges";
import { cn } from "@/lib/utils";

const BADGES = [
  { id: "Explorer", name: "Explorer", icon: Eye, color: "text-blue-500", bg: "bg-blue-100" },
  { id: "Detective", name: "Detail Detective", icon: Sparkles, color: "text-purple-500", bg: "bg-purple-100" },
  { id: "Truth Seeker", name: "Truth Seeker", icon: Shield, color: "text-emerald-500", bg: "bg-emerald-100" },
  { id: "Scholar", name: "Scholar", icon: BookOpen, color: "text-orange-500", bg: "bg-orange-100" },
  { id: "Guardian", name: "Guardian", icon: Award, color: "text-rose-500", bg: "bg-rose-100" },
  { id: "Master", name: "Master", icon: Zap, color: "text-yellow-500", bg: "bg-yellow-100" },
];

export default function Collection() {
  const { state } = useGame();
  const [tab, setTab] = useState<"crystals" | "badges">("crystals");

  const crystalsEarnedCount = Object.values(state.worldProgress).filter(w => w.crystalEarned).length;
  const completionPercentage = Math.round((crystalsEarnedCount / 4) * 100);

  return (
    <div className="min-h-screen bg-slate-50 pb-24 pt-8">
      <div className="max-w-md mx-auto px-4">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Collection</h1>
          
          <div className="flex items-center justify-center mt-6">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                <circle 
                  cx="50" 
                  cy="50" 
                  r="45" 
                  fill="none" 
                  stroke="#FF7A59" 
                  strokeWidth="8" 
                  strokeDasharray={`${completionPercentage * 2.83} 283`}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-2xl font-bold text-gray-800">{completionPercentage}%</span>
                <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Restored</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex p-1 bg-gray-200/50 rounded-2xl mb-8">
          <button 
            onClick={() => setTab("crystals")}
            className={cn("flex-1 py-3 text-sm font-bold rounded-xl transition-all", tab === "crystals" ? "bg-white text-primary shadow-sm" : "text-gray-500")}
          >
            Crystals (4)
          </button>
          <button 
            onClick={() => setTab("badges")}
            className={cn("flex-1 py-3 text-sm font-bold rounded-xl transition-all", tab === "badges" ? "bg-white text-primary shadow-sm" : "text-gray-500")}
          >
            Badges ({BADGES.length})
          </button>
        </div>

        {/* Content */}
        {tab === "crystals" && (
          <div className="grid grid-cols-2 gap-4">
            {WORLDS.map(world => {
              const earned = state.worldProgress[world.id]?.crystalEarned;
              return (
                <motion.div 
                  key={world.id}
                  whileHover={{ scale: 1.02 }}
                  className={cn(
                    "p-6 rounded-3xl border-2 flex flex-col items-center justify-center text-center aspect-square transition-all duration-500",
                    earned ? "bg-white border-orange-100 shadow-md" : "bg-gray-100 border-gray-200 border-dashed opacity-70 grayscale"
                  )}
                >
                  <div className={cn(
                    "text-5xl mb-4 transition-all duration-500",
                    earned && "drop-shadow-lg scale-110 animate-float"
                  )}>
                    {world.icon}
                  </div>
                  <h3 className="font-bold text-gray-800 text-sm">{world.name} Crystal</h3>
                  {earned ? (
                    <span className="text-xs font-bold text-primary mt-2">Restored!</span>
                  ) : (
                    <span className="text-xs text-gray-400 mt-2 flex items-center"><Lock size={12} className="mr-1"/> Locked</span>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}

        {tab === "badges" && (
          <div className="grid grid-cols-3 gap-4">
            {BADGES.map(badge => {
              const earned = state.badges.includes(badge.id);
              const Icon = badge.icon;
              return (
                <div key={badge.id} className="flex flex-col items-center">
                  <div className={cn(
                    "w-20 h-20 rounded-2xl flex items-center justify-center mb-2 shadow-sm transition-all duration-500",
                    earned ? badge.bg : "bg-gray-100 grayscale opacity-50"
                  )}>
                    <Icon size={32} className={earned ? badge.color : "text-gray-400"} />
                  </div>
                  <span className={cn("text-xs text-center font-bold", earned ? "text-gray-700" : "text-gray-400")}>
                    {badge.name}
                  </span>
                </div>
              );
            })}
          </div>
        )}

      </div>
      <BottomNav />
    </div>
  );
}

// Simple Lock icon locally since it wasn't imported at top
function Lock(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>;
}
