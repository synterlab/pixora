import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type PixoMood = "Happy" | "Excited" | "Curious" | "Thinking" | "Celebrating" | "Neutral";

export function Pixo({ mood = "Neutral", className, size = "md" }: { mood?: PixoMood; className?: string; size?: "sm" | "md" | "lg" }) {
  const isThinking = mood === "Thinking";
  const isHappy = mood === "Happy" || mood === "Excited" || mood === "Celebrating";
  
  const sizes = {
    sm: "w-12 h-12",
    md: "w-24 h-24",
    lg: "w-32 h-32"
  };

  return (
    <motion.div
      className={cn("relative flex items-center justify-center rounded-full bg-white animate-float shadow-lg", sizes[size], className)}
      style={{
        boxShadow: "0 0 20px rgba(255, 122, 89, 0.4)",
        background: "radial-gradient(circle at 30% 30%, #fff, #FFF8F0)"
      }}
      animate={mood === "Celebrating" ? { y: [-10, 10, -10], rotate: [0, 10, -10, 0] } : {}}
      transition={{ duration: 1, repeat: mood === "Celebrating" ? Infinity : 0 }}
    >
      {/* Sparkles for Celebrating */}
      {mood === "Celebrating" && (
        <>
          <div className="absolute -top-4 -left-4 w-4 h-4 bg-yellow-400 rounded-full animate-ping opacity-75" />
          <div className="absolute top-4 -right-6 w-3 h-3 bg-primary rounded-full animate-ping opacity-75" style={{ animationDelay: '0.2s' }} />
          <div className="absolute -bottom-4 right-0 w-5 h-5 bg-accent rounded-full animate-ping opacity-75" style={{ animationDelay: '0.4s' }} />
        </>
      )}

      {/* Eyes */}
      <div className="absolute top-[35%] flex gap-3">
        <motion.div 
          className="w-3 h-3 bg-gray-800 rounded-full"
          animate={isThinking ? { scaleY: 0.2, y: 2 } : { scaleY: 1, y: 0 }}
        />
        <motion.div 
          className="w-3 h-3 bg-gray-800 rounded-full"
          animate={isHappy ? { scaleY: 0.5, y: -2, borderRadius: "50% 50% 0 0" } : { scaleY: 1, y: 0, borderRadius: "50%" }}
        />
      </div>

      {/* Mouth */}
      <motion.div 
        className="absolute top-[60%] w-4 h-2 border-b-2 border-gray-800 rounded-b-full"
        animate={
          mood === "Excited" || mood === "Celebrating" ? { scale: 1.5, height: "10px", backgroundColor: "#FF7A59", borderBottom: "none" } :
          mood === "Thinking" ? { width: "6px", height: "6px", borderRadius: "50%", border: "2px solid #333" } : 
          {}
        }
      />
    </motion.div>
  );
}
