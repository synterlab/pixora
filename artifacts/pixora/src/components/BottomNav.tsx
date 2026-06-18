import { Link, useLocation } from "wouter";
import { Map, Sword, Diamond, UserCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const [location] = useLocation();

  const links = [
    { href: "/map", icon: Map, label: "MAP", color: "from-emerald-400 to-teal-500", glow: "rgba(16, 185, 129, 0.5)" },
    { href: "/world/active", icon: Sword, label: "ADVENTURE", isAdventure: true, color: "from-orange-400 to-rose-500", glow: "rgba(255, 122, 89, 0.6)" },
    { href: "/collection", icon: Diamond, label: "GEMS", color: "from-violet-500 to-purple-600", glow: "rgba(139, 92, 246, 0.5)" },
    { href: "/pixo", icon: UserCircle2, label: "PIXO", color: "from-amber-400 to-yellow-500", glow: "rgba(245, 158, 11, 0.5)" },
  ];

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 pb-safe"
      style={{
        background: "rgba(255, 248, 240, 0.95)",
        backdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(255, 122, 89, 0.15)",
        boxShadow: "0 -8px 32px rgba(0,0,0,0.08)",
      }}
    >
      <div className="max-w-md mx-auto flex items-end justify-around px-2 py-2">
        {links.map((link) => {
          const isActive = location === link.href || (link.isAdventure && location.startsWith("/world/"));
          const Icon = link.icon;

          return (
            <Link key={link.href} href={link.href} className="flex-1 flex flex-col items-center outline-none">
              <motion.div
                className="relative flex flex-col items-center"
                whileTap={{ scale: 0.85 }}
              >
                {/* Active indicator bubble */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      layoutId="nav-bubble"
                      className={cn("absolute -inset-2 rounded-2xl bg-gradient-to-br", link.color)}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      style={{ boxShadow: `0 4px 20px ${link.glow}` }}
                    />
                  )}
                </AnimatePresence>

                {/* Glow ring for active */}
                {isActive && (
                  <motion.div
                    className={cn("absolute -inset-3 rounded-2xl bg-gradient-to-br opacity-30 blur-md", link.color)}
                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}

                {/* Icon */}
                <div className={cn(
                  "relative z-10 flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300",
                  !isActive && "bg-orange-50"
                )}>
                  <motion.div
                    animate={isActive ? { y: [0, -2, 0] } : {}}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Icon
                      size={isActive ? 22 : 20}
                      strokeWidth={isActive ? 2.5 : 2}
                      className={isActive ? "text-white drop-shadow-sm" : "text-orange-300"}
                    />
                  </motion.div>
                </div>

                {/* Label */}
                <motion.span
                  className={cn(
                    "relative z-10 text-[9px] font-black mt-1 tracking-wider transition-all duration-300",
                    isActive ? "text-transparent bg-clip-text bg-gradient-to-r" : "text-orange-300"
                  )}
                  style={isActive ? { backgroundImage: `linear-gradient(to right, ${link.color.replace("from-", "").replace("to-", "")})` } : {}}
                >
                  {link.label}
                </motion.span>

                {/* Adventure special glow */}
                {link.isAdventure && isActive && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center text-[8px]"
                    animate={{ scale: [1, 1.3, 1], rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    ⚡
                  </motion.div>
                )}
              </motion.div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
