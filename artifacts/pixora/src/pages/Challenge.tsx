import { useEffect, useState, useRef } from "react";
import { useRoute, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, ArrowRight, Star, Zap } from "lucide-react";
import { WORLDS } from "@/data/challenges";
import { useGame } from "@/store/gameStore";
import { HUD } from "@/components/HUD";
import { Pixo } from "@/components/Pixo";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const WORLD_PALETTES = [
  { bg: "from-emerald-900 via-teal-900 to-slate-900", accent: "#10B981", glow: "rgba(16,185,129,0.5)", card: "rgba(16,185,129,0.08)" },
  { bg: "from-blue-900 via-indigo-900 to-slate-900", accent: "#6366F1", glow: "rgba(99,102,241,0.5)", card: "rgba(99,102,241,0.08)" },
  { bg: "from-purple-900 via-violet-900 to-slate-900", accent: "#8B5CF6", glow: "rgba(139,92,246,0.5)", card: "rgba(139,92,246,0.08)" },
  { bg: "from-indigo-900 via-blue-900 to-slate-900", accent: "#4F46E5", glow: "rgba(79,70,229,0.5)", card: "rgba(79,70,229,0.08)" },
];

// Confetti particle for correct answers
function ConfettiParticle({ x, color, delay }: { x: number; color: string; delay: number }) {
  return (
    <motion.div
      className="absolute w-2 h-2 rounded-sm top-0"
      style={{ left: `${x}%`, background: color }}
      initial={{ y: -10, rotate: 0, opacity: 1 }}
      animate={{ y: 200, rotate: 720, opacity: 0 }}
      transition={{ duration: 1.2 + Math.random() * 0.8, delay, ease: "easeIn" }}
    />
  );
}

export default function Challenge() {
  const [, params] = useRoute("/world/:id");
  const [, setLocation] = useLocation();
  const { state, answerQuestion, completeMission, completeWorld } = useGame();

  const worldIdStr = params?.id;

  useEffect(() => {
    if (worldIdStr === "active") {
      setLocation(`/world/${state.currentWorld}`);
    }
  }, [worldIdStr, state.currentWorld, setLocation]);

  const worldId = parseInt(worldIdStr || "1", 10);
  const world = WORLDS.find(w => w.id === worldId);
  const progress = state.worldProgress[worldId];
  const palette = WORLD_PALETTES[(worldId - 1) % WORLD_PALETTES.length];

  const [currentMissionIndex, setCurrentMissionIndex] = useState(progress?.missionsCompleted || 0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState((progress?.questionsAnswered || 0) % 3);

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [xpGain, setXpGain] = useState<number | null>(null);

  const CONFETTI_COLORS = ["#FF7A59", "#FFB84D", "#6A5CFF", "#22D3EE", "#F472B6", "#34D399", "#FBBF24"];
  const confettiParticles = Array.from({ length: 16 }, (_, i) => ({
    x: Math.random() * 100,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    delay: Math.random() * 0.3,
  }));

  if (!world || !progress) {
    return <div className="min-h-screen gradient-adventure flex items-center justify-center text-white font-bold">World not found</div>;
  }

  // Completed state
  if (progress.crystalEarned || currentMissionIndex >= world.missions.length) {
    return (
      <div className={cn("min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br text-white relative overflow-hidden", palette.bg)}>
        {/* Sparkle background */}
        {[...Array(20)].map((_, i) => (
          <motion.div key={i} className="absolute w-1.5 h-1.5 rounded-full bg-white"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
            transition={{ duration: 2 + Math.random() * 2, delay: Math.random() * 3, repeat: Infinity }}
          />
        ))}

        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 150, damping: 12 }}
          className="text-center relative z-10"
        >
          {/* Trophy glow */}
          <motion.div
            className="text-8xl mb-4"
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            💎
          </motion.div>
          <Pixo mood="Celebrating" size="lg" className="mx-auto mb-8" />
          <motion.h1
            className="text-4xl font-black font-heading mb-3"
            style={{ textShadow: "0 0 30px rgba(255,255,255,0.5)" }}
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Crystal Restored!
          </motion.h1>
          <p className="text-xl mb-2 opacity-90 font-bold">You recovered the {world.name} crystal!</p>
          <p className="text-amber-300 font-black text-lg mb-10">+200 XP earned!</p>
          <motion.button
            onClick={() => setLocation("/map")}
            className="bg-white text-gray-900 hover:bg-gray-100 rounded-2xl px-10 py-5 text-lg font-black shadow-2xl border-2 border-white/30"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            style={{ boxShadow: "0 8px 40px rgba(255,255,255,0.3)" }}
          >
            🗺️ Back to Map
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const mission = world.missions[currentMissionIndex];
  const question = mission.questions[currentQuestionIndex];

  const handleSelectAnswer = (option: string) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(option);
    const correct = option === question.answer;
    setIsCorrect(correct);
    setShowExplanation(true);
    answerQuestion(worldId, currentMissionIndex, correct);

    if (correct) {
      setShowConfetti(true);
      setXpGain(10);
      setTimeout(() => { setShowConfetti(false); setXpGain(null); }, 1800);
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowExplanation(false);

    if (currentQuestionIndex < 2) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      completeMission(worldId);
      if (currentMissionIndex < world.missions.length - 1) {
        setCurrentMissionIndex(prev => prev + 1);
        setCurrentQuestionIndex(0);
      } else {
        completeWorld(worldId);
      }
    }
  };

  const totalProgress = (currentMissionIndex * 3 + currentQuestionIndex) / 9;

  return (
    <div className={cn("min-h-screen relative pb-8 bg-gradient-to-br overflow-hidden", palette.bg)}>
      <HUD />

      {/* Confetti */}
      <AnimatePresence>
        {showConfetti && (
          <div className="absolute top-16 left-0 right-0 z-50 overflow-hidden pointer-events-none h-40">
            {confettiParticles.map((p, i) => (
              <ConfettiParticle key={i} x={p.x} color={p.color} delay={p.delay} />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* XP Pop */}
      <AnimatePresence>
        {xpGain && (
          <motion.div
            className="absolute top-24 right-6 z-50 font-black text-2xl text-yellow-400"
            style={{ textShadow: "0 0 20px rgba(255,200,0,0.8)" }}
            initial={{ opacity: 0, y: 0, scale: 0.5 }}
            animate={{ opacity: 1, y: -50, scale: 1.2 }}
            exit={{ opacity: 0, y: -80 }}
            transition={{ duration: 0.8 }}
          >
            +{xpGain} XP ⚡
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background glow blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full blur-3xl opacity-20"
          style={{ background: `radial-gradient(circle, ${palette.accent}, transparent)` }} />
        <div className="absolute bottom-0 -left-20 w-72 h-72 rounded-full blur-3xl opacity-20"
          style={{ background: `radial-gradient(circle, ${palette.accent}, transparent)` }} />
      </div>

      <div className="relative z-10 max-w-md mx-auto px-4 pt-20 flex flex-col min-h-screen">

        {/* Back button */}
        <motion.button
          onClick={() => setLocation("/map")}
          className="flex items-center gap-1.5 mb-4 text-white/50 hover:text-white/80 font-bold text-sm transition-colors"
          whileTap={{ scale: 0.94 }}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <span className="text-lg">←</span>
          <span>Back to Map</span>
        </motion.button>

        {/* Mission Header */}
        <motion.div
          className="flex items-center justify-between mb-5 p-4 rounded-3xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">{world.icon}</span>
              <p className="text-xs font-black text-white/50 uppercase tracking-widest">Mission {currentMissionIndex + 1}/3</p>
            </div>
            <h2 className="text-base font-black text-white">{mission.title}</h2>
          </div>
          <Pixo mood={isCorrect === true ? "Celebrating" : isCorrect === false ? "Thinking" : "Curious"} size="sm" />
        </motion.div>

        {/* Progress bar */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-black text-white/40">Progress</span>
            <span className="text-xs font-black text-white/40">{Math.round(totalProgress * 100)}%</span>
          </div>
          <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, ${palette.accent}, #FFB84D)` }}
              initial={{ width: 0 }}
              animate={{ width: `${totalProgress * 100}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>
          {/* Step dots */}
          <div className="flex gap-2 mt-2 justify-center">
            {[0, 1, 2].map(idx => (
              <motion.div
                key={idx}
                className={cn("h-2 rounded-full transition-all duration-400",
                  idx === currentQuestionIndex
                    ? "w-8"
                    : idx < currentQuestionIndex ? "w-4 opacity-60" : "w-4 opacity-20"
                )}
                style={{ background: idx <= currentQuestionIndex ? palette.accent : "white" }}
              />
            ))}
          </div>
        </div>

        {/* Question card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -60, opacity: 0 }}
            transition={{ type: "spring", stiffness: 250, damping: 25 }}
            className="rounded-3xl p-5 mb-5 relative overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.10)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            <div className="absolute top-3 right-3 opacity-30 text-3xl">🔮</div>
            <p className="text-lg font-bold text-white leading-relaxed pr-8">
              {question.text}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Answer options */}
        <div className="flex flex-col gap-3 flex-1">
          {question.options.map((option, idx) => {
            const isSelected = selectedAnswer === option;
            const isRightAnswer = option === question.answer;
            const labels = ["A", "B", "C", "D"];

            let bgStyle: React.CSSProperties = {
              background: "rgba(255,255,255,0.08)",
              border: "1.5px solid rgba(255,255,255,0.12)",
            };
            let textClass = "text-white";
            let animClass = "";

            if (showExplanation) {
              if (isRightAnswer) {
                bgStyle = {
                  background: "rgba(34,197,94,0.2)",
                  border: "2px solid rgba(34,197,94,0.7)",
                  boxShadow: "0 0 20px rgba(34,197,94,0.4), inset 0 0 20px rgba(34,197,94,0.1)",
                };
                textClass = "text-green-200";
                animClass = "correct-burst";
              } else if (isSelected && !isRightAnswer) {
                bgStyle = {
                  background: "rgba(239,68,68,0.2)",
                  border: "2px solid rgba(239,68,68,0.6)",
                  boxShadow: "0 0 20px rgba(239,68,68,0.3)",
                };
                textClass = "text-red-200";
                animClass = "wrong-burst";
              } else {
                bgStyle = { background: "rgba(255,255,255,0.03)", border: "1.5px solid rgba(255,255,255,0.06)" };
                textClass = "text-white/30";
              }
            } else if (isSelected) {
              bgStyle = {
                background: `rgba(${palette.accent.replace("rgb(","").replace(")","")}, 0.2)`,
                border: `2px solid ${palette.accent}`,
              };
            }

            return (
              <motion.button
                key={idx}
                onClick={() => handleSelectAnswer(option)}
                disabled={showExplanation}
                className={cn("relative w-full text-left p-4 rounded-2xl font-bold text-base transition-all duration-200", textClass, animClass)}
                style={bgStyle}
                whileHover={!showExplanation ? { scale: 1.02, x: 4 } : {}}
                whileTap={!showExplanation ? { scale: 0.97 } : {}}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.08 }}
              >
                <div className="flex items-center gap-3">
                  {/* Label bubble */}
                  <div className={cn(
                    "w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black flex-shrink-0",
                    showExplanation && isRightAnswer ? "bg-green-500 text-white" :
                    showExplanation && isSelected && !isRightAnswer ? "bg-red-500 text-white" :
                    "bg-white/10 text-white/60"
                  )}>
                    {showExplanation && isRightAnswer ? <Check size={14} /> :
                     showExplanation && isSelected && !isRightAnswer ? <X size={14} /> :
                     labels[idx]}
                  </div>
                  <span className="flex-1 text-sm leading-snug">{option}</span>
                  {showExplanation && isRightAnswer && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.6 }}>
                      <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    </motion.div>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Explanation panel */}
        <AnimatePresence>
          {showExplanation && (
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="mt-5 rounded-3xl p-5 overflow-hidden relative"
              style={{
                background: isCorrect ? "rgba(34,197,94,0.12)" : "rgba(255,122,89,0.12)",
                backdropFilter: "blur(16px)",
                border: isCorrect ? "1.5px solid rgba(34,197,94,0.4)" : "1.5px solid rgba(255,122,89,0.4)",
              }}
            >
              <div className="flex items-start gap-3 mb-4">
                <div className={cn(
                  "w-10 h-10 rounded-2xl flex items-center justify-center text-xl flex-shrink-0",
                  isCorrect ? "bg-green-500/20" : "bg-orange-500/20"
                )}>
                  {isCorrect ? "🎉" : "💡"}
                </div>
                <div>
                  <h3 className={cn("font-black text-base mb-1", isCorrect ? "text-green-300" : "text-orange-300")}>
                    {isCorrect ? "Brilliant! +10 XP" : "Good try — keep going!"}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">{question.explanation}</p>
                </div>
              </div>
              <motion.button
                onClick={handleNext}
                className="w-full py-4 rounded-2xl font-black text-base text-white relative overflow-hidden"
                style={{
                  background: isCorrect
                    ? "linear-gradient(135deg, #22C55E, #16A34A)"
                    : "linear-gradient(135deg, #FF7A59, #E8521D)",
                  boxShadow: isCorrect ? "0 4px 20px rgba(34,197,94,0.4)" : "0 4px 20px rgba(255,122,89,0.4)",
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <motion.div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)", skewX: -20 }}
                  animate={{ x: ["-150%", "150%"] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {currentQuestionIndex === 2 && currentMissionIndex === 2 ? "✨ Complete World" : "Continue"}
                  <ArrowRight size={18} />
                </span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="h-8" />
      </div>
    </div>
  );
}
