import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type PixoMood = "Happy" | "Excited" | "Curious" | "Thinking" | "Celebrating" | "Neutral";

const MOOD_COLORS: Record<PixoMood, string> = {
  Happy: "from-amber-300 via-orange-300 to-rose-300",
  Excited: "from-yellow-300 via-orange-400 to-pink-400",
  Curious: "from-sky-300 via-cyan-300 to-teal-300",
  Thinking: "from-violet-300 via-purple-300 to-indigo-300",
  Celebrating: "from-yellow-300 via-pink-400 to-purple-400",
  Neutral: "from-slate-200 via-gray-200 to-zinc-200",
};

const MOOD_GLOW: Record<PixoMood, string> = {
  Happy: "rgba(255, 180, 77, 0.6)",
  Excited: "rgba(255, 120, 89, 0.7)",
  Curious: "rgba(34, 211, 238, 0.6)",
  Thinking: "rgba(139, 92, 246, 0.6)",
  Celebrating: "rgba(255, 200, 77, 0.8)",
  Neutral: "rgba(156, 163, 175, 0.4)",
};

export function Pixo({ mood = "Neutral", className, size = "md" }: { mood?: PixoMood; className?: string; size?: "sm" | "md" | "lg" }) {
  const isThinking = mood === "Thinking";
  const isHappy = mood === "Happy" || mood === "Excited" || mood === "Celebrating";
  const isExcited = mood === "Excited" || mood === "Celebrating";
  const glowColor = MOOD_GLOW[mood];

  const sizes = {
    sm: { outer: "w-14 h-14", eye: "w-2.5 h-2.5", eyeGap: "gap-2", eyeTop: "top-[33%]", mouthTop: "top-[58%]", mouthW: "w-4 h-2", pupil: "w-1 h-1" },
    md: { outer: "w-24 h-24", eye: "w-3.5 h-3.5", eyeGap: "gap-3", eyeTop: "top-[34%]", mouthTop: "top-[59%]", mouthW: "w-6 h-2.5", pupil: "w-1.5 h-1.5" },
    lg: { outer: "w-36 h-36", eye: "w-5 h-5", eyeGap: "gap-4", eyeTop: "top-[34%]", mouthTop: "top-[60%]", mouthW: "w-8 h-3", pupil: "w-2 h-2" },
  }[size];

  return (
    <motion.div
      className={cn("relative flex items-center justify-center rounded-full", sizes.outer, className)}
      style={{ boxShadow: `0 0 30px ${glowColor}, 0 0 60px ${glowColor}40` }}
      animate={
        mood === "Celebrating"
          ? { y: [-8, 8, -8], rotate: [0, 8, -8, 0] }
          : mood === "Excited"
          ? { y: [-4, 4, -4] }
          : { y: [0, -6, 0] }
      }
      transition={{
        duration: mood === "Celebrating" ? 0.8 : mood === "Excited" ? 0.6 : 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Gradient body */}
      <div className={cn("absolute inset-0 rounded-full bg-gradient-to-br", MOOD_COLORS[mood])} />

      {/* Shine overlay */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/50 via-transparent to-transparent" />

      {/* Inner glow ring */}
      <div
        className="absolute inset-1 rounded-full opacity-30"
        style={{ background: `radial-gradient(circle at 35% 35%, white, transparent 70%)` }}
      />

      {/* Orbiting sparkles for Celebrating */}
      {mood === "Celebrating" && (
        <>
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full"
              style={{
                background: ["#FFD700", "#FF6B8A", "#6A5CFF", "#22D3EE"][i],
                boxShadow: `0 0 8px ${["#FFD700", "#FF6B8A", "#6A5CFF", "#22D3EE"][i]}`,
              }}
              animate={{ rotate: [i * 90, i * 90 + 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              transformOrigin="center"
              initial={{ x: 0, y: 0 }}
            >
              <motion.div
                style={{ transformOrigin: "0px 0px" }}
                animate={{ x: [0], y: [0] }}
              />
            </motion.div>
          ))}
          {/* Ping dots */}
          <div className="absolute -top-3 -left-3 w-4 h-4 bg-yellow-400 rounded-full animate-ping opacity-75" />
          <div className="absolute top-2 -right-5 w-3 h-3 bg-pink-400 rounded-full animate-ping opacity-75" style={{ animationDelay: '0.2s' }} />
          <div className="absolute -bottom-3 right-1 w-4 h-4 bg-purple-400 rounded-full animate-ping opacity-75" style={{ animationDelay: '0.4s' }} />
          <div className="absolute -bottom-2 -left-4 w-3 h-3 bg-cyan-400 rounded-full animate-ping opacity-75" style={{ animationDelay: '0.6s' }} />
        </>
      )}

      {/* Thinking bubbles */}
      {mood === "Thinking" && (
        <>
          <motion.div className="absolute -top-2 -right-2 w-2 h-2 rounded-full bg-violet-300" animate={{ scale: [0.5, 1, 0.5], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.2, repeat: Infinity }} />
          <motion.div className="absolute -top-5 right-0 w-3 h-3 rounded-full bg-purple-300" animate={{ scale: [0.5, 1, 0.5], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.3 }} />
          <motion.div className="absolute -top-9 right-1 w-4 h-4 rounded-full bg-indigo-200" animate={{ scale: [0.5, 1, 0.5], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.6 }} />
        </>
      )}

      {/* Eyes */}
      <div className={cn("absolute flex", sizes.eyeGap, sizes.eyeTop)}>
        {/* Left eye */}
        <motion.div
          className={cn("relative rounded-full bg-gray-800 flex items-center justify-center overflow-hidden", sizes.eye)}
          animate={isThinking ? { scaleY: 0.15, y: 2 } : isHappy ? { scaleY: 0.55, y: -1 } : { scaleY: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {!isThinking && !isHappy && (
            <motion.div
              className={cn("rounded-full bg-white", sizes.pupil)}
              animate={{ x: [0, 1, -1, 0], y: [0, -1, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
          {isExcited && <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/30" />}
        </motion.div>

        {/* Right eye */}
        <motion.div
          className={cn("relative rounded-full bg-gray-800 flex items-center justify-center overflow-hidden", sizes.eye)}
          animate={isThinking ? { scaleY: 0.15, y: 2 } : isHappy ? { scaleY: 0.55, y: -1 } : { scaleY: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {!isThinking && !isHappy && (
            <motion.div
              className={cn("rounded-full bg-white", sizes.pupil)}
              animate={{ x: [0, 1, -1, 0], y: [0, -1, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            />
          )}
          {isExcited && <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/30" />}
        </motion.div>
      </div>

      {/* Mouth */}
      {isThinking ? (
        <motion.div
          className={cn("absolute border-2 border-gray-800 rounded-full", sizes.mouthTop)}
          style={{ width: 8, height: 8 }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      ) : isExcited ? (
        <motion.div
          className={cn("absolute bg-gray-800 rounded-t-full", sizes.mouthTop)}
          style={{ width: size === "sm" ? 16 : size === "md" ? 22 : 30, height: size === "sm" ? 8 : size === "md" ? 11 : 14 }}
          animate={{ scaleY: [1, 1.15, 1] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      ) : (
        <motion.div
          className={cn("absolute border-b-2 border-gray-800 rounded-b-full", sizes.mouthTop, sizes.mouthW)}
          animate={isHappy ? { scaleY: 1.5 } : { scaleY: 1 }}
        />
      )}

      {/* Rosy cheeks */}
      {(isHappy || isExcited) && (
        <div className="absolute" style={{ top: "50%", left: 0, right: 0, display: "flex", justifyContent: "space-between", padding: "0 10%" }}>
          <div className="w-3 h-2 rounded-full bg-rose-400/50 blur-sm" />
          <div className="w-3 h-2 rounded-full bg-rose-400/50 blur-sm" />
        </div>
      )}
    </motion.div>
  );
}
