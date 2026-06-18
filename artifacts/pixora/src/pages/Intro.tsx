import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Pixo } from "@/components/Pixo";
import { useGame } from "@/store/gameStore";

export default function Intro() {
  const [, setLocation] = useLocation();
  const { state, completeIntro } = useGame();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (state.introSeen) {
      setLocation("/map");
    }
  }, [state.introSeen, setLocation]);

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 2000);
    const timer2 = setTimeout(() => setStep(2), 5000);
    const timer3 = setTimeout(() => setStep(3), 8000);
    const timer4 = setTimeout(() => setStep(4), 11000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  const handleStart = () => {
    completeIntro();
    setLocation("/map");
  };

  if (state.introSeen) return null;

  return (
    <div className="min-h-screen bg-slate-900 overflow-hidden relative flex flex-col items-center justify-center p-6">
      <AnimatePresence>
        {step >= 0 && step < 2 && (
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="w-48 h-64 bg-white/20 blur-md rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
              className="absolute w-32 h-48 bg-cyan-300 rounded-t-full rounded-b-xl shadow-[0_0_50px_rgba(34,211,238,0.8)]"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
            />
          </motion.div>
        )}

        {step === 1 && (
          <motion.div 
            className="absolute inset-0 bg-purple-900/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* AI Storm effect */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnPjxmaWx0ZXIgaWQ9J24nPmZlVHVyYnVsZW5jZSB0eXBlPSdmcmFjdGFsTm9pc2UnIGJhc2VGcmVxdWVuY3k9JzAuMScgbnVtT2N0YXZlcz0nNScvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnIGZpbHRlcj0ndXJsKCNuKScgb3BhY2l0eT0nMC4yJy8+PC9zdmc+')] mix-blend-overlay" />
          </motion.div>
        )}

        {step >= 2 && (
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
             {/* Shattered pieces flying */}
             {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute w-16 h-16 bg-cyan-300 rounded-lg shadow-[0_0_20px_rgba(34,211,238,0.8)]"
                  initial={{ x: 0, y: 0, rotate: 0 }}
                  animate={{ 
                    x: Math.cos(i * Math.PI / 2) * 300, 
                    y: Math.sin(i * Math.PI / 2) * 300,
                    rotate: 360,
                    opacity: 0
                  }}
                  transition={{ duration: 2, ease: "easeOut" }}
                />
             ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="z-10 mt-32 text-center text-white min-h-[200px] flex flex-col items-center">
        <AnimatePresence mode="wait">
          {step === 3 && (
            <motion.div
              key="msg1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-2xl font-bold font-heading"
            >
              Oh no. The Crystal Memories are gone.
            </motion.div>
          )}
          {step >= 4 && (
            <motion.div
              key="msg2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center"
            >
              <Pixo mood="Curious" size="lg" className="mb-8" />
              <h1 className="text-3xl font-bold font-heading mb-8">
                Will you help me restore Pixora?
              </h1>
              <motion.button
                onClick={handleStart}
                className="bg-primary hover:bg-primary/90 text-white text-xl font-bold py-4 px-8 rounded-full shadow-[0_0_30px_rgba(255,122,89,0.5)] border-2 border-white/20 active:scale-95 transition-transform"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{ boxShadow: ["0 0 20px rgba(255,122,89,0.5)", "0 0 40px rgba(255,122,89,0.8)", "0 0 20px rgba(255,122,89,0.5)"] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ✨ START ADVENTURE
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
