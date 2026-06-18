import { useEffect, useState, useRef } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Pixo } from "@/components/Pixo";
import { useGame } from "@/store/gameStore";

const NUM_STARS = 60;
const STAR_DATA = Array.from({ length: NUM_STARS }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2.5 + 0.8,
  delay: Math.random() * 4,
  duration: Math.random() * 3 + 2,
}));

const PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 6 + 4,
  color: ["#FF7A59", "#FFB84D", "#6A5CFF", "#22D3EE", "#F472B6", "#34D399"][i % 6],
  delay: Math.random() * 5,
  duration: Math.random() * 8 + 6,
}));

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
    const timers = [
      setTimeout(() => setStep(1), 1800),
      setTimeout(() => setStep(2), 4500),
      setTimeout(() => setStep(3), 7000),
      setTimeout(() => setStep(4), 9500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleStart = () => {
    completeIntro();
    setLocation("/map");
  };

  if (state.introSeen) return null;

  return (
    <div className="min-h-screen overflow-hidden relative flex flex-col items-center justify-center p-6"
      style={{ background: "linear-gradient(160deg, #0f0c29 0%, #1a0845 30%, #0d1f4a 60%, #071a2e 100%)" }}
    >
      {/* Starfield */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {STAR_DATA.map(star => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
            }}
            animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.3, 0.8] }}
            transition={{ duration: star.duration, delay: star.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

        {/* Nebula blobs */}
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #6A5CFF, transparent)" }} />
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #FF7A59, transparent)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-8 blur-3xl"
          style={{ background: "radial-gradient(circle, #22D3EE, transparent)" }} />

        {/* Floating particles */}
        {PARTICLES.map(p => (
          <motion.div
            key={p.id}
            className="absolute rounded-full opacity-20"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              background: p.color,
              filter: `blur(${p.size / 3}px)`,
            }}
            animate={{ y: [0, -30, 0], x: [0, 15, 0], opacity: [0.1, 0.4, 0.1] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Step 0-1: Crystal appears */}
      <AnimatePresence>
        {step >= 0 && step < 2 && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8 }}
          >
            {/* Rotating halo */}
            <motion.div
              className="absolute w-72 h-72 rounded-full"
              style={{ background: "conic-gradient(from 0deg, transparent, rgba(34,211,238,0.3), transparent, rgba(106,92,255,0.3), transparent)" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />
            {/* Crystal body */}
            <motion.div
              className="relative w-36 h-48 flex items-center justify-center"
              initial={{ scale: 0, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 1.2, type: "spring", bounce: 0.4 }}
            >
              {/* Glow behind */}
              <div className="absolute inset-0 blur-2xl opacity-60" style={{ background: "radial-gradient(ellipse, rgba(34,211,238,0.8), transparent)" }} />
              {/* Crystal shape */}
              <div
                className="relative w-24 h-40 animate-float"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(34,211,238,0.8) 30%, rgba(106,92,255,0.7) 70%, rgba(255,122,89,0.6) 100%)",
                  clipPath: "polygon(50% 0%, 90% 30%, 100% 60%, 80% 100%, 20% 100%, 0% 60%, 10% 30%)",
                  boxShadow: "0 0 40px rgba(34,211,238,0.8), 0 0 80px rgba(106,92,255,0.4), inset 0 0 30px rgba(255,255,255,0.3)",
                }}
              >
                {/* Inner facets */}
                <div className="absolute inset-0 opacity-50"
                  style={{
                    background: "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.6) 50%, transparent 70%)",
                    clipPath: "polygon(50% 0%, 90% 30%, 100% 60%, 80% 100%, 20% 100%, 0% 60%, 10% 30%)",
                  }}
                />
              </div>
              {/* Sparkles */}
              {[0,1,2,3,4].map(i => (
                <motion.div
                  key={i}
                  className="absolute text-white text-lg font-bold"
                  style={{ top: `${20 + i*15}%`, left: `${i % 2 === 0 ? -20 : 110}%` }}
                  animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
                  transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity }}
                >
                  ✦
                </motion.div>
              ))}
            </motion.div>

            {/* Step 1: AI Storm overlay */}
            <AnimatePresence>
              {step === 1 && (
                <motion.div
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="absolute inset-0" style={{
                    background: "radial-gradient(ellipse at center, rgba(139,92,246,0.4) 0%, transparent 70%)",
                    mixBlendMode: "screen",
                  }} />
                  {/* Lightning lines */}
                  {[0,1,2].map(i => (
                    <motion.div key={i} className="absolute top-0 bottom-0"
                      style={{ left: `${25 + i * 25}%`, width: 1, background: "linear-gradient(to bottom, transparent, rgba(139,92,246,0.8), transparent)" }}
                      animate={{ opacity: [0, 1, 0, 1, 0] }}
                      transition={{ duration: 0.4, delay: i * 0.15, repeat: Infinity, repeatDelay: 0.8 }}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step 2: Shatter */}
      <AnimatePresence>
        {step === 2 && (
          <motion.div className="absolute inset-0 flex items-center justify-center" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {[0, 1, 2, 3, 4, 5].map(i => (
              <motion.div
                key={i}
                className="absolute w-12 h-16"
                style={{
                  background: "linear-gradient(135deg, rgba(34,211,238,0.9), rgba(106,92,255,0.7))",
                  clipPath: "polygon(50% 0%, 100% 50%, 80% 100%, 20% 100%, 0% 50%)",
                  boxShadow: "0 0 20px rgba(34,211,238,0.8)",
                }}
                initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
                animate={{
                  x: Math.cos(i * Math.PI / 3) * 280,
                  y: Math.sin(i * Math.PI / 3) * 280,
                  rotate: Math.random() * 720 - 360,
                  opacity: 0,
                  scale: 0.2,
                }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            ))}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.4, times: [0, 0.2, 1] }}
              style={{ background: "radial-gradient(circle, rgba(255,255,255,0.8), transparent)" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main text content */}
      <div className="z-10 mt-16 text-center text-white min-h-[280px] flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {step === 3 && (
            <motion.div
              key="msg1"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="text-center px-4"
            >
              <motion.div
                className="text-7xl mb-6"
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                💔
              </motion.div>
              <h2 className="text-3xl font-black font-heading mb-3 text-shadow-glow"
                style={{ textShadow: "0 0 20px rgba(255,122,89,0.8), 0 2px 8px rgba(0,0,0,0.5)" }}>
                Oh no...
              </h2>
              <p className="text-xl font-bold text-cyan-200">
                The Crystal Memories<br />have been shattered!
              </p>
            </motion.div>
          )}

          {step >= 4 && (
            <motion.div
              key="msg2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
              className="flex flex-col items-center"
            >
              {/* Pixo with glow platform */}
              <div className="relative mb-6">
                <motion.div
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-40 h-8 rounded-full blur-xl opacity-60"
                  style={{ background: "radial-gradient(ellipse, rgba(255,122,89,0.8), transparent)" }}
                  animate={{ scaleX: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <Pixo mood="Excited" size="lg" className="relative z-10" />
              </div>

              {/* Title */}
              <motion.div className="mb-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <h1 className="text-4xl font-black font-heading tracking-tight"
                  style={{ textShadow: "0 0 30px rgba(255,122,89,0.9), 0 0 60px rgba(255,122,89,0.5), 0 3px 10px rgba(0,0,0,0.5)" }}>
                  PIXORA
                </h1>
              </motion.div>
              <motion.p
                className="text-base font-bold text-amber-300 mb-8 tracking-wide"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                style={{ textShadow: "0 0 15px rgba(255,184,77,0.8)" }}
              >
                Adventures in the Age of AI
              </motion.p>

              <motion.p
                className="text-lg font-bold text-white/90 mb-8 text-center leading-relaxed px-4"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              >
                Will you help me restore<br />
                <span className="text-cyan-300 font-black">the Crystal Memories?</span>
              </motion.p>

              {/* Start button */}
              <motion.button
                onClick={handleStart}
                className="relative text-white text-xl font-black py-5 px-10 rounded-full overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #FF7A59 0%, #FF4D6D 50%, #C9184A 100%)",
                  boxShadow: "0 0 30px rgba(255,122,89,0.7), 0 0 60px rgba(255,122,89,0.3), 0 8px 20px rgba(0,0,0,0.3)",
                  border: "2px solid rgba(255,255,255,0.3)",
                }}
                whileHover={{ scale: 1.08, boxShadow: "0 0 50px rgba(255,122,89,0.9), 0 0 80px rgba(255,122,89,0.5)" }}
                whileTap={{ scale: 0.94 }}
                animate={{
                  boxShadow: [
                    "0 0 30px rgba(255,122,89,0.7), 0 8px 20px rgba(0,0,0,0.3)",
                    "0 0 60px rgba(255,122,89,1), 0 8px 20px rgba(0,0,0,0.3)",
                    "0 0 30px rgba(255,122,89,0.7), 0 8px 20px rgba(0,0,0,0.3)",
                  ]
                }}
                transition={{ duration: 1.8, repeat: Infinity }}
                initial={{ opacity: 0, y: 20 }}
              >
                {/* Shimmer */}
                <motion.div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)", skewX: -20 }}
                  animate={{ x: ["-150%", "150%"] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                />
                <span className="relative z-10">✨ START ADVENTURE</span>
              </motion.button>

              {/* Skip hint */}
              <motion.p className="mt-4 text-white/40 text-xs font-bold" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                Tap to begin your quest
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
