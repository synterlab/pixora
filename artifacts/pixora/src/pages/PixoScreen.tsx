import { useState } from "react";
import { Link } from "wouter";
import { Settings, Volume2, VolumeX, Trash2, ShieldCheck, ChevronRight } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { Pixo } from "@/components/Pixo";
import { useGame } from "@/store/gameStore";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

export default function PixoScreen() {
  const { state, toggleSound, resetProgress } = useGame();
  
  const accuracy = state.totalQuestionsAnswered > 0 
    ? Math.round((state.totalCorrectAnswers / state.totalQuestionsAnswered) * 100) 
    : 0;

  const getMood = () => {
    if (accuracy > 80) return "Celebrating";
    if (accuracy > 50) return "Happy";
    return "Curious";
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] pb-24 pt-8">
      <div className="max-w-md mx-auto px-4">
        
        <div className="flex justify-end mb-4">
          <Link href="/parent">
            <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-800 bg-white/50 rounded-full">
              <Settings className="w-6 h-6" />
            </Button>
          </Link>
        </div>

        {/* Character Area */}
        <div className="flex flex-col items-center justify-center py-12 relative">
          
          {/* Speech Bubble */}
          <div className="bg-white px-6 py-4 rounded-3xl rounded-br-sm shadow-sm border border-orange-100 mb-8 max-w-[80%] relative animate-float-slow">
            <p className="text-gray-700 font-medium text-center">
              {accuracy === 0 ? "Ready to explore the worlds together?" : 
               accuracy > 80 ? "You're a natural detective! Keep it up!" : 
               "Every mistake is just a chance to learn something new!"}
            </p>
          </div>

          <div className="w-48 h-48 relative flex items-center justify-center">
             <div className="absolute inset-0 bg-orange-200/40 rounded-full blur-2xl animate-pulse" />
             <Pixo mood={getMood()} size="lg" />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white p-5 rounded-3xl shadow-sm border border-orange-100 flex flex-col items-center">
            <span className="text-3xl font-bold font-heading text-primary mb-1">{state.totalXP}</span>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total XP</span>
          </div>
          <div className="bg-white p-5 rounded-3xl shadow-sm border border-orange-100 flex flex-col items-center">
            <span className="text-3xl font-bold font-heading text-secondary mb-1">{accuracy}%</span>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Accuracy</span>
          </div>
        </div>

        {/* Settings List */}
        <div className="bg-white rounded-3xl shadow-sm border border-orange-100 overflow-hidden">
          <button 
            onClick={toggleSound}
            className="w-full px-6 py-4 flex items-center justify-between border-b border-gray-100 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3 text-gray-700 font-bold">
              {state.soundEnabled ? <Volume2 className="text-primary" /> : <VolumeX className="text-gray-400" />}
              Sound Effects
            </div>
            <div className="w-12 h-6 bg-gray-200 rounded-full relative transition-colors" style={{ backgroundColor: state.soundEnabled ? '#FF7A59' : '#e5e7eb' }}>
              <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${state.soundEnabled ? 'right-0.5' : 'left-0.5'}`} />
            </div>
          </button>
          
          <Link href="/parent">
            <button className="w-full px-6 py-4 flex items-center justify-between border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3 text-gray-700 font-bold">
                <ShieldCheck className="text-emerald-500" />
                Parent Area
              </div>
              <ChevronRight className="text-gray-400" />
            </button>
          </Link>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="w-full px-6 py-4 flex items-center justify-between hover:bg-red-50 transition-colors text-red-500">
                <div className="flex items-center gap-3 font-bold">
                  <Trash2 />
                  Reset Progress
                </div>
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-3xl">
              <AlertDialogHeader>
                <AlertDialogTitle>Reset all progress?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will delete all earned crystals, badges, and XP. This cannot be undone!
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={resetProgress} className="bg-red-500 hover:bg-red-600 rounded-xl">Yes, reset</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

      </div>
      <BottomNav />
    </div>
  );
}
