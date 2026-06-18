import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Settings, Volume2, VolumeX, RefreshCw } from "lucide-react";
import { useGame } from "@/store/gameStore";
import { useAuth } from "@/store/authStore";
import { Pixo } from "@/components/Pixo";
import { HUD } from "@/components/HUD";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";

type PixoMood = "Happy"|"Excited"|"Curious"|"Thinking"|"Celebrating"|"Neutral";

const PIXO_MESSAGES: Record<string, { text: string; mood: PixoMood }> = {
  default:  { text:"Hey! I'm PIXO, your AI guide. Ready to learn?", mood:"Happy" },
  start:    { text:"You're doing great! Keep exploring the worlds.", mood:"Excited" },
  thinking: { text:"Hmm, that's a tough one… Let me think…",          mood:"Thinking" },
  fact1:    { text:"AI learns from data — just like you learn from reading books!",  mood:"Curious" },
  fact2:    { text:"Robots can learn to play games by practicing millions of times!", mood:"Excited" },
  fact3:    { text:"The word 'Algorithm' means a set of step-by-step instructions.", mood:"Curious" },
  celebrate:{ text:"You're amazing! All crystals restored!",            mood:"Celebrating" },
};

export default function PixoScreen() {
  const [, setLocation] = useLocation();
  const { state, toggleSound, resetProgress } = useGame();
  const { user, openLoginModal, logout } = useAuth();
  const [currentMsg, setCurrentMsg] = useState("default");
  const [showReset, setShowReset] = useState(false);

  const msg = PIXO_MESSAGES[currentMsg] ?? PIXO_MESSAGES.default;

  const handleReset = () => {
    resetProgress();
    setShowReset(false);
    setLocation("/");
  };

  return (
    <div className="min-h-screen pb-28 pt-20 relative" style={{ background:"var(--px-bg)" }}>
      <div className="absolute inset-0 pointer-events-none opacity-4"
        style={{ backgroundImage:"linear-gradient(var(--px-bg2) 1px,transparent 1px),linear-gradient(90deg,var(--px-bg2) 1px,transparent 1px)", backgroundSize:"24px 24px" }} />
      <HUD />

      <div className="max-w-md mx-auto px-4 pt-4 relative z-10">

        {/* Top bar */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setLocation("/map")}
            style={{ fontFamily:"'Press Start 2P'", fontSize:8, color:"var(--px-green3)", background:"none", border:"none", cursor:"pointer", letterSpacing:1 }}>
            ◀ MAP
          </button>
          <Link href="/parent">
            <Button variant="ghost" size="icon" className="text-green-600 hover:text-green-400"
              style={{ background:"var(--px-bg2)", border:"2px solid var(--px-green3)", borderRadius:0 }}>
              <Settings className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="px-label" style={{ letterSpacing:3, color:"var(--px-gray)" }}>YOUR AI GUIDE</div>
          <h1 className="px-title mt-1" style={{ fontSize:12, color:"var(--px-green)" }}>PIXO</h1>
        </div>

        {/* Pixo + speech bubble */}
        <div className="flex flex-col items-center mb-6">
          <Pixo mood={msg.mood} size="lg" />
          <div className="px-box-glow mt-4 p-4 w-full text-center">
            <div className="px-body" style={{ fontSize:20, color:"var(--px-white)", lineHeight:1.4 }}>
              "{msg.text}"
            </div>
          </div>
        </div>

        {/* Chat buttons */}
        <div className="grid grid-cols-2 gap-2 mb-6">
          {[
            ["ASK PIXO", "default"],
            ["HOW AM I?", "start"],
            ["AI FACT", "fact1"],
            ["FUN FACT", "fact2"],
          ].map(([label, key]) => (
            <button key={key} onClick={() => setCurrentMsg(key)}
              className="px-btn"
              style={{ fontSize:8, padding:"10px 6px", letterSpacing:1 }}>
              {label}
            </button>
          ))}
        </div>

        {/* Login / Account */}
        <div className="px-label mb-2" style={{ fontSize:7, color:"var(--px-green2)", letterSpacing:2 }}>◈ EXPLORER ACCOUNT</div>
        <button className="w-full text-left mb-5 cursor-pointer" onClick={openLoginModal}
          style={{ background:"var(--px-bg2)", border:"2px solid var(--px-green3)", padding:"12px 14px", boxShadow:"4px 4px 0 var(--px-dark)", display:"block" }}>
          <div className="flex items-center gap-4">
            <span style={{ fontSize:28 }}>{user ? user.avatar : "👤"}</span>
            <div className="flex-1 min-w-0">
              {user ? (
                <>
                  <div style={{ fontFamily:"'Press Start 2P'", fontSize:9, color:"var(--px-white)" }}>{user.name}</div>
                  <div className="px-muted" style={{ fontSize:16 }}>PIXORA Explorer · tap to manage</div>
                </>
              ) : (
                <>
                  <div style={{ fontFamily:"'Press Start 2P'", fontSize:9, color:"var(--px-white)" }}>LOG IN</div>
                  <div className="px-muted" style={{ fontSize:16 }}>Save progress & achievements</div>
                </>
              )}
            </div>
            {user ? (
              <button
                onClick={e => { e.stopPropagation(); logout(); }}
                style={{ fontFamily:"'Press Start 2P'", fontSize:7, color:"#FF4444", background:"#1a0000", border:"2px solid #FF4444", padding:"4px 8px", cursor:"pointer", boxShadow:"2px 2px 0 #330000" }}>
                OUT
              </button>
            ) : (
              <span style={{ fontFamily:"'Press Start 2P'", fontSize:10, color:"var(--px-green3)" }}>▶</span>
            )}
          </div>
        </button>

        {/* Settings */}
        <div className="px-label mb-2" style={{ fontSize:7, color:"var(--px-green2)", letterSpacing:2 }}>◈ SETTINGS</div>
        <div className="flex flex-col gap-2 mb-6">

          {/* Sound toggle */}
          <button className="w-full flex items-center justify-between" onClick={toggleSound}
            style={{ background:"var(--px-bg2)", border:"2px solid var(--px-green3)", padding:"12px 14px", boxShadow:"4px 4px 0 var(--px-dark)", cursor:"pointer" }}>
            <div className="flex items-center gap-3">
              {state.soundEnabled ? <Volume2 size={18} style={{ color:"var(--px-green)" }} /> : <VolumeX size={18} style={{ color:"var(--px-green3)" }} />}
              <span style={{ fontFamily:"'Press Start 2P'", fontSize:8, color:"var(--px-white)" }}>SOUND</span>
            </div>
            <div style={{
              fontFamily:"'Press Start 2P'", fontSize:8, padding:"3px 10px",
              background: state.soundEnabled ? "var(--px-green)" : "var(--px-bg3)",
              color: state.soundEnabled ? "var(--px-bg)" : "var(--px-green3)",
              border: `2px solid ${state.soundEnabled ? "var(--px-white)" : "var(--px-green3)"}`,
            }}>
              {state.soundEnabled ? "ON" : "OFF"}
            </div>
          </button>

          {/* Parent mode */}
          <Link href="/parent">
            <div className="w-full flex items-center justify-between"
              style={{ background:"var(--px-bg2)", border:"2px solid var(--px-green3)", padding:"12px 14px", boxShadow:"4px 4px 0 var(--px-dark)", cursor:"pointer" }}>
              <div className="flex items-center gap-3">
                <Settings size={18} style={{ color:"var(--px-green)" }} />
                <span style={{ fontFamily:"'Press Start 2P'", fontSize:8, color:"var(--px-white)" }}>PARENT MODE</span>
              </div>
              <span style={{ fontFamily:"'Press Start 2P'", fontSize:10, color:"var(--px-green3)" }}>▶</span>
            </div>
          </Link>

          {/* Reset */}
          <button className="w-full flex items-center justify-between" onClick={() => setShowReset(true)}
            style={{ background:"#1a0000", border:"2px solid #FF4444", padding:"12px 14px", boxShadow:"4px 4px 0 #330000", cursor:"pointer" }}>
            <div className="flex items-center gap-3">
              <RefreshCw size={18} style={{ color:"#FF4444" }} />
              <span style={{ fontFamily:"'Press Start 2P'", fontSize:8, color:"#FF4444" }}>RESET GAME</span>
            </div>
          </button>
        </div>

        {/* Version */}
        <div className="text-center">
          <div className="px-label" style={{ fontSize:6, color:"var(--px-green3)", letterSpacing:2 }}>PIXORA v1.0 · playpixora.fun</div>
        </div>
      </div>

      {/* Reset confirm overlay */}
      {showReset && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.92)", zIndex:999, display:"flex", alignItems:"flex-end", justifyContent:"center" }}
          onClick={() => setShowReset(false)}>
          <div style={{ width:"100%", maxWidth:480, background:"var(--px-bg)", borderTop:"2px solid #FF4444", borderLeft:"2px solid #FF4444", borderRight:"2px solid #FF4444", padding:"28px 24px 48px" }}
            onClick={e => e.stopPropagation()}>
            <div style={{ fontFamily:"'Press Start 2P'", fontSize:11, color:"#FF4444", marginBottom:8 }}>⚠ RESET GAME</div>
            <div className="px-body" style={{ color:"var(--px-white)", fontSize:20, marginBottom:24 }}>
              This will erase ALL progress, XP, and crystals. Are you sure?
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowReset(false)}
                style={{ flex:1, fontFamily:"'Press Start 2P'", fontSize:9, padding:"14px 0", background:"var(--px-bg2)", border:"2px solid var(--px-green3)", color:"var(--px-green3)", boxShadow:"4px 4px 0 var(--px-dark)", cursor:"pointer" }}>
                CANCEL
              </button>
              <button onClick={handleReset}
                style={{ flex:1, fontFamily:"'Press Start 2P'", fontSize:9, padding:"14px 0", background:"#1a0000", border:"2px solid #FF4444", color:"#FF4444", boxShadow:"4px 4px 0 #330000", cursor:"pointer" }}>
                RESET
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
