import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type PixoMood = "Happy" | "Excited" | "Curious" | "Thinking" | "Celebrating" | "Neutral";

export function Pixo({ mood = "Neutral", className, size = "md" }: {
  mood?: PixoMood; className?: string; size?: "sm"|"md"|"lg";
}) {
  const px = { sm: 48, md: 80, lg: 112 }[size];
  const eyePx = { sm: 8, md: 12, lg: 18 }[size];
  const isHappy = ["Happy","Excited","Celebrating"].includes(mood);
  const isCelebrating = mood === "Celebrating";
  const isThinking = mood === "Thinking";

  return (
    <motion.div
      className={cn("relative flex-shrink-0", className)}
      style={{ width: px, height: px }}
      animate={isCelebrating
        ? { y:[-8,8,-8], rotate:[0,6,-6,0] }
        : { y:[0,-6,0] }}
      transition={{ duration: isCelebrating ? 0.7 : 2.5, repeat:Infinity, ease:"linear" }}>

      {/* Outer glow */}
      <div className="absolute inset-0"
        style={{ boxShadow:`0 0 ${px*0.3}px rgba(0,255,65,0.4), 0 0 ${px*0.6}px rgba(0,255,65,0.15)` }} />

      {/* Body */}
      <div className="absolute inset-0"
        style={{ background:"var(--px-bg2)", border:`2px solid var(--px-green)` }}>

        {/* Scanline */}
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,255,65,0.3) 3px,rgba(0,255,65,0.3) 4px)" }} />

        {/* Antenna */}
        <div className="absolute"
          style={{ top:`-${px*0.18}px`, left:"50%", transform:"translateX(-50%)", width:2, height:px*0.18, background:"var(--px-green)" }}>
          <div style={{ width:px*0.1, height:px*0.1, background:"var(--px-green)", borderRadius:"50%", position:"absolute", top:0, left:"50%", transform:"translateX(-50%) translateY(-50%)" }} />
        </div>

        {/* Screen face */}
        <div className="absolute"
          style={{
            top:"20%", left:"10%", right:"10%", bottom:"20%",
            background:"#000", border:"2px solid var(--px-green3)",
          }}>

          {/* Eyes */}
          <div className="absolute flex justify-around items-center"
            style={{ top:"20%", left:"10%", right:"10%" }}>
            {[0,1].map(i => (
              <motion.div key={i}
                style={{ width:eyePx, height:eyePx, background:"var(--px-green)", flexShrink:0 }}
                animate={isHappy
                  ? { scaleY:[1,0.3,1] }
                  : isThinking
                  ? { opacity:[1,0.3,1] }
                  : { scaleY:1 }}
                transition={{ duration:isHappy?0.6:1.5, repeat:Infinity, delay:i*0.1 }}>
              </motion.div>
            ))}
          </div>

          {/* Mouth */}
          <div className="absolute flex justify-center" style={{ bottom:"20%", left:0, right:0 }}>
            {isHappy ? (
              <div style={{ width:eyePx*2, height:eyePx*0.6, background:"var(--px-green)", borderRadius:"0 0 2px 2px" }} />
            ) : isThinking ? (
              <div style={{ width:eyePx, height:eyePx*0.5, background:"var(--px-green3)" }} />
            ) : (
              <div style={{ width:eyePx*1.6, height:eyePx*0.4, background:"var(--px-green2)" }} />
            )}
          </div>
        </div>

        {/* Ear flaps */}
        {["-left-1.5","right-0"].map((side, i) => (
          <div key={i} className={`absolute top-1/3 ${side}`}
            style={{ width:px*0.08, height:px*0.25, background:"var(--px-bg3)", border:"2px solid var(--px-green3)" }} />
        ))}
      </div>

      {/* Celebrating sparkles */}
      {isCelebrating && [0,1,2,3].map(i => (
        <motion.div key={i}
          className="absolute"
          style={{ width:6, height:6, background:"var(--px-green)",
            top:`${[-15,-5,80,90][i]}%`, left:`${[-10,110,-10,110][i]}%` }}
          animate={{ opacity:[0,1,0], scale:[0,1.5,0] }}
          transition={{ duration:0.6, delay:i*0.15, repeat:Infinity }} />
      ))}

      {/* Thinking dots */}
      {isThinking && [0,1,2].map(i => (
        <motion.div key={i}
          className="absolute"
          style={{ width:4, height:4, background:"var(--px-green)", right:`${-8-i*10}px`, top:`${30-i*10}%` }}
          animate={{ opacity:[0,1,0] }}
          transition={{ duration:0.8, delay:i*0.25, repeat:Infinity }} />
      ))}
    </motion.div>
  );
}
