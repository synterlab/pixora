import { useEffect, useState } from "react";
import { useRoute, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, ArrowRight, Star } from "lucide-react";
import { WORLDS } from "@/data/challenges";
import { useGame } from "@/store/gameStore";
import { HUD } from "@/components/HUD";
import { Pixo } from "@/components/Pixo";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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

  const [currentMissionIndex, setCurrentMissionIndex] = useState(progress?.missionsCompleted || 0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState((progress?.questionsAnswered || 0) % 3);
  
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  if (!world || !progress) {
    return <div>World not found</div>;
  }

  if (progress.crystalEarned || currentMissionIndex >= world.missions.length) {
    return (
      <div className={cn("min-h-screen flex flex-col items-center justify-center p-6 text-white", world.color)}>
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <Pixo mood="Celebrating" size="lg" className="mx-auto mb-8" />
          <h1 className="text-4xl font-bold font-heading mb-4 text-shadow-sm">World Completed!</h1>
          <p className="text-xl mb-8 opacity-90">You restored the {world.name} crystal!</p>
          <Button 
            onClick={() => setLocation("/map")}
            className="bg-white text-gray-900 hover:bg-gray-100 rounded-full px-8 py-6 text-lg font-bold shadow-lg"
          >
            Back to Map
          </Button>
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

  return (
    <div className={cn("min-h-screen relative pb-24", world.color.replace("bg-", "bg-opacity-10 bg-"))}>
      <HUD />
      
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className={cn("absolute -top-20 -right-20 w-96 h-96 rounded-full blur-3xl", world.color)} />
        <div className={cn("absolute bottom-0 -left-20 w-80 h-80 rounded-full blur-3xl", world.color)} />
      </div>

      <div className="relative z-10 max-w-md mx-auto px-4 pt-20 flex flex-col h-[calc(100vh-80px)]">
        
        {/* Mission Header */}
        <div className="flex items-center justify-between mb-6 bg-white/80 backdrop-blur rounded-2xl p-4 shadow-sm">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Mission {currentMissionIndex + 1}/3</p>
            <h2 className="text-lg font-bold text-gray-800">{mission.title}</h2>
          </div>
          <Pixo mood={isCorrect === true ? "Happy" : isCorrect === false ? "Thinking" : "Curious"} size="sm" />
        </div>

        {/* Progress Dots */}
        <div className="flex gap-2 mb-6 justify-center">
          {[0, 1, 2].map(idx => (
            <div 
              key={idx} 
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                idx === currentQuestionIndex ? "w-8 bg-primary" : idx < currentQuestionIndex ? "w-4 bg-primary/40" : "w-4 bg-gray-200"
              )} 
            />
          ))}
        </div>

        {/* Question Area */}
        <div className="flex-1 flex flex-col">
          <motion.div 
            key={question.id}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-white rounded-3xl p-6 shadow-md mb-6 border border-gray-100"
          >
            <p className="text-lg font-bold text-gray-800 leading-relaxed">
              {question.text}
            </p>
          </motion.div>

          {/* Options */}
          <div className="flex flex-col gap-3">
            {question.options.map((option, idx) => {
              const isSelected = selectedAnswer === option;
              const isRightAnswer = option === question.answer;
              
              let stateClass = "bg-white hover:bg-orange-50 border-gray-200 text-gray-700";
              if (showExplanation) {
                if (isRightAnswer) {
                  stateClass = "bg-green-100 border-green-500 text-green-800 shadow-[0_0_15px_rgba(34,197,94,0.3)]";
                } else if (isSelected && !isRightAnswer) {
                  stateClass = "bg-red-50 border-red-300 text-red-800 animate-shake";
                } else {
                  stateClass = "bg-gray-50 border-gray-200 text-gray-400 opacity-50";
                }
              } else if (isSelected) {
                stateClass = "bg-primary/10 border-primary text-primary";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectAnswer(option)}
                  disabled={showExplanation}
                  className={cn(
                    "relative w-full text-left p-5 rounded-2xl border-2 font-bold text-base transition-all duration-200 active:scale-[0.98]",
                    stateClass
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showExplanation && isRightAnswer && <Check className="text-green-600" />}
                    {showExplanation && isSelected && !isRightAnswer && <X className="text-red-500" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Explanation & Next Button */}
        <AnimatePresence>
          {showExplanation && (
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mt-6 bg-white rounded-3xl p-6 shadow-lg border-2 border-primary/20"
            >
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <h3 className={cn("font-bold mb-2 flex items-center gap-2", isCorrect ? "text-green-600" : "text-orange-500")}>
                    {isCorrect ? "Brilliant!" : "Not quite!"}
                    {isCorrect && <motion.div animate={{ scale: [1, 1.2, 1] }}><Star className="w-5 h-5 fill-current" /></motion.div>}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{question.explanation}</p>
                </div>
              </div>
              <Button 
                onClick={handleNext}
                className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl py-6 font-bold text-lg"
              >
                {currentQuestionIndex === 2 && currentMissionIndex === 2 ? "Complete World" : "Continue"} <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
