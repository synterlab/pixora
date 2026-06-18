import { Link, useLocation } from "wouter";
import { Map, Sword, Diamond, UserCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const [location] = useLocation();

  const links = [
    { href:"/map",          icon:Map,         label:"MAP"      },
    { href:"/world/active", icon:Sword,       label:"QUEST", isAdventure:true },
    { href:"/collection",   icon:Diamond,     label:"GEMS"     },
    { href:"/pixo",         icon:UserCircle2, label:"PIXO"     },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50"
      style={{ background:"var(--px-bg)", borderTop:"2px solid var(--px-green3)" }}>
      <div className="max-w-md mx-auto flex items-center justify-around px-2 py-2">
        {links.map(link => {
          const isActive = location === link.href || (link.isAdventure && location.startsWith("/world/"));
          const Icon = link.icon;
          return (
            <Link key={link.href} href={link.href} className="flex-1 flex flex-col items-center outline-none">
              <motion.div className="relative flex flex-col items-center" whileTap={{ scale:0.88 }}>
                {/* Active indicator */}
                {isActive && (
                  <motion.div layoutId="nav-px"
                    className="absolute inset-0"
                    style={{ background:"var(--px-bg2)", border:"2px solid var(--px-green)", margin:"-4px -8px" }}
                    initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
                  />
                )}

                {/* Icon */}
                <div className="relative z-10 flex items-center justify-center w-10 h-10">
                  <Icon size={isActive ? 22 : 18} strokeWidth={isActive ? 2.5 : 2}
                    style={{ color: isActive ? "var(--px-green)" : "var(--px-green3)" }} />
                  {link.isAdventure && isActive && (
                    <motion.div className="absolute -top-1 -right-1"
                      style={{ fontFamily:"'Press Start 2P'", fontSize:8, color:"var(--px-green)" }}
                      animate={{ opacity:[1,0,1] }} transition={{ duration:0.8, repeat:Infinity }}>
                      !
                    </motion.div>
                  )}
                </div>

                {/* Label */}
                <span style={{
                  fontFamily:"'Press Start 2P'", fontSize:6,
                  color: isActive ? "var(--px-green)" : "var(--px-green3)",
                  letterSpacing:1,
                }}>
                  {link.label}
                </span>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
