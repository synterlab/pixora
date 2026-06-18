import { useState } from "react";
import { Link } from "wouter";
import { Settings, Volume2, VolumeX, Trash2, ShieldCheck, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { BottomNav } from "@/components/BottomNav";
import { Pixo } from "@/components/Pixo";
import { useGame } from "@/store/gameStore";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const STAR_DATA = Array.from({ length: 20 }, (_, i) => ({
  x: Math.random() * 100, y: Math.random() * 100,
  size: Math.random() * 2 + 1, delay: Math.random() * 4, duration: Math.random() * 3 + 2,
}));

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

  const getMessage = () => {
    if (accuracy === 0) return "Ready to explore the worlds together?";
    if (accuracy > 80) return "You're a natural detective! Keep it up!";
    return "Every mistake is just a chance to learn!";
  };

  const crystalsEarned = Object.values(state.worldProgress).filter(w => w.crystalEarned).length;

  return (
    <div className="min-h-screen pb-28 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #0f172a 0%, #1e1b4b 40%, #0f2027 100%)" }}>

      {/* Starfield */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {STAR_DATA.map((s, i) => (
          <motion.div key={i} className="absolute rounded-full bg-white"
            style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size }}
            animate={{ opacity: [0.1, 0.7, 0.1] }}
            transition={{ duration: s.duration, delay: s.delay, repeat: Infinity }}
          />
        ))}
        <div className="absolute top-1/4 right-0 w-64 h-64 rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #FF7A59, transparent)" }} />
        <div className="absolute bottom-1/3 left-0 w-64 h-64 rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #6A5CFF, transparent)" }} />
      </div>

      <div className="max-w-md mx-auto px-4 pt-10 relative z-10">

        {/* Settings button */}
        <div className="flex justify-end mb-4">
          <Link href="/parent">
            <Button variant="ghost" size="icon"
              className="text-white/40 hover:text-white rounded-2xl"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}>
              <Settings className="w-5 h-5" />
            </Button>
          </Link>
        </div>

        {/* Character area */}
        <div className="flex flex-col items-center justify-center py-8 relative">
          {/* Speech bubble */}
          <motion.div
            className="px-6 py-4 rounded-3xl rounded-b-none mb-6 max-w-[85%] text-center relative"
            style={{
              background: "rgba(255,255,255,0.10)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Bubble tail */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0"
              style={{ borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderTop: "10px solid rgba(255,255,255,0.10)" }} />
            <p className="text-white/80 font-bold text-sm leading-relaxed">{getMessage()}</p>
          </motion.div>

          {/* Pixo with platform glow */}
          <div className="relative flex items-center justify-center">
            <motion.div
              className="absolute -bottom-6 w-48 h-8 rounded-full blur-2xl opacity-50"
              style={{ background: "radial-gradient(ellipse, rgba(255,122,89,0.8), transparent)" }}
              animate={{ scaleX: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
            <Pixo mood={getMood()} size="lg" />
          </div>

          {/* Title */}
          <motion.h1
            className="mt-10 text-2xl font-black text-white tracking-tight"
            style={{ textShadow: "0 0 20px rgba(255,122,89,0.4)" }}
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Pixo
          </motion.h1>
          <p className="text-white/30 text-xs font-bold tracking-widest uppercase mt-1">Your AI Guide</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: "Total XP", value: state.totalXP, icon: "⚡", color: "from-amber-500 to-orange-600" },
            { label: "Accuracy", value: `${accuracy}%`, icon: "🎯", color: "from-emerald-500 to-teal-600" },
            { label: "Crystals", value: `${crystalsEarned}/4`, icon: "💎", color: "from-violet-500 to-purple-600" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="rounded-2xl p-4 flex flex-col items-center text-center relative overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.10)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.04 }}
            >
              <div className="text-2xl mb-1">{stat.icon}</div>
              <motion.span
                className="text-2xl font-black text-white"
                key={String(stat.value)}
                initial={{ scale: 1.3 }} animate={{ scale: 1 }}
              >
                {stat.value}
              </motion.span>
              <span className="text-[10px] font-bold text-white/30 uppercase tracking-wider mt-0.5">{stat.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Settings list */}
        <div className="rounded-3xl overflow-hidden mb-4"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.10)",
          }}>
          {/* Sound toggle */}
          <button
            onClick={toggleSound}
            className="w-full px-5 py-4 flex items-center justify-between border-b border-white/5 hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-3 text-white/80 font-bold">
              {state.soundEnabled
                ? <Volume2 className="text-emerald-400" size={20} />
                : <VolumeX className="text-white/30" size={20} />}
              Sound Effects
            </div>
            <motion.div
              className="w-12 h-6 rounded-full relative transition-all duration-300"
              style={{ background: state.soundEnabled ? "#10B981" : "rgba(255,255,255,0.1)", boxShadow: state.soundEnabled ? "0 0 15px rgba(16,185,129,0.4)" : "none" }}
            >
              <motion.div
                className="w-5 h-5 bg-white rounded-full absolute top-0.5 shadow-md"
                animate={{ left: state.soundEnabled ? "calc(100% - 22px)" : "2px" }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              />
            </motion.div>
          </button>

          {/* Parent area */}
          <Link href="/parent">
            <button className="w-full px-5 py-4 flex items-center justify-between border-b border-white/5 hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-3 text-white/80 font-bold">
                <ShieldCheck className="text-emerald-400" size={20} />
                Parent Area
              </div>
              <ChevronRight className="text-white/20" size={18} />
            </button>
          </Link>

          {/* Reset */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="w-full px-5 py-4 flex items-center gap-3 text-red-400 font-bold hover:bg-red-500/10 transition-colors">
                <Trash2 size={20} />
                Reset Progress
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-3xl mx-4"
              style={{ background: "rgba(15,23,42,0.95)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(20px)" }}>
              <AlertDialogHeader>
                <AlertDialogTitle className="text-white font-black">Reset all progress?</AlertDialogTitle>
                <AlertDialogDescription className="text-white/50">
                  This will delete all earned crystals, badges, and XP. This cannot be undone!
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="rounded-2xl bg-white/10 text-white border-white/20 hover:bg-white/20">Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={resetProgress} className="rounded-2xl bg-red-500 hover:bg-red-600 text-white">Yes, reset</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
