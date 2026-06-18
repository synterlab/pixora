import { Link } from "wouter";
import { ArrowLeft, Shield, Brain, Eye, BookOpen } from "lucide-react";
import { useGame } from "@/store/gameStore";
import { Button } from "@/components/ui/button";

export default function ParentSummary() {
  const { state } = useGame();

  const totalMissions = 12; // 4 worlds * 3 missions
  const completedMissions = Object.values(state.worldProgress).reduce((acc, curr) => acc + curr.missionsCompleted, 0);
  const accuracy = state.totalQuestionsAnswered > 0 
    ? Math.round((state.totalCorrectAnswers / state.totalQuestionsAnswered) * 100) 
    : 0;

  const skills = [
    { name: "Visual Analysis", icon: Eye, color: "text-blue-500", bg: "bg-blue-100", progress: state.worldProgress[1]?.missionsCompleted || 0 },
    { name: "Language Literacy", icon: BookOpen, color: "text-emerald-500", bg: "bg-emerald-100", progress: state.worldProgress[2]?.missionsCompleted || 0 },
    { name: "Fact Verification", icon: Brain, color: "text-purple-500", bg: "bg-purple-100", progress: state.worldProgress[3]?.missionsCompleted || 0 },
    { name: "Digital Citizenship", icon: Shield, color: "text-orange-500", bg: "bg-orange-100", progress: state.worldProgress[4]?.missionsCompleted || 0 },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-slate-900 text-white p-6 pt-12 rounded-b-[40px] shadow-lg">
        <Link href="/pixo">
          <Button variant="ghost" className="text-white hover:text-white/80 hover:bg-white/10 mb-4 -ml-4 rounded-full">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </Button>
        </Link>
        <h1 className="text-2xl font-bold font-heading mb-2 flex items-center gap-2">
          <Shield className="text-emerald-400" /> Parent Dashboard
        </h1>
        <p className="text-slate-300 text-sm">Track learning progress and AI literacy skills.</p>
      </div>

      <div className="max-w-md mx-auto px-6 py-8">
        
        {/* Overview Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100">
            <div className="text-3xl font-bold text-slate-800 mb-1">{completedMissions}<span className="text-lg text-slate-400 font-normal">/{totalMissions}</span></div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Missions</div>
          </div>
          <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100">
            <div className="text-3xl font-bold text-slate-800 mb-1">{accuracy}%</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Accuracy</div>
          </div>
        </div>

        {/* Skills Breakdown */}
        <h2 className="text-xl font-bold text-slate-800 mb-4">Skills Practiced</h2>
        <div className="space-y-4 mb-8">
          {skills.map(skill => (
            <div key={skill.name} className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${skill.bg}`}>
                <skill.icon className={skill.color} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="font-bold text-slate-700">{skill.name}</span>
                  <span className="text-sm text-slate-500 font-medium">{skill.progress}/3</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${skill.bg.replace('bg-', 'bg-').replace('100', '500')}`} 
                    style={{ width: `${(skill.progress / 3) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Achievements - Simple list */}
        <h2 className="text-xl font-bold text-slate-800 mb-4">Achievements</h2>
        <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
          {state.badges.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {state.badges.map(badge => (
                <span key={badge} className="bg-white border border-slate-200 px-3 py-1.5 rounded-full text-sm font-bold text-slate-600 shadow-sm">
                  🏆 {badge}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-slate-500 text-center py-4">No badges earned yet. Keep exploring!</p>
          )}
        </div>

      </div>
    </div>
  );
}
