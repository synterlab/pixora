import { Link, useLocation } from "wouter";
import { Map, Sword, Diamond, UserCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const [location] = useLocation();

  const links = [
    { href: "/map", icon: Map, label: "MAP" },
    { href: "/world/active", icon: Sword, label: "ADVENTURE", isAdventure: true },
    { href: "/collection", icon: Diamond, label: "COLLECTION" },
    { href: "/pixo", icon: UserCircle2, label: "PIXO" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-orange-100 pb-safe px-4 py-2 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {links.map((link) => {
          const isActive = location === link.href || (link.isAdventure && location.startsWith("/world/"));
          const Icon = link.icon;
          
          return (
            <Link key={link.href} href={link.href} className="flex-1 flex flex-col items-center justify-center p-2 outline-none group">
              <div className={cn(
                "relative flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300",
                isActive ? "bg-primary text-white scale-110 shadow-lg" : "bg-orange-50 text-orange-400 group-hover:bg-orange-100"
              )}>
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                {isActive && (
                  <span className="absolute inset-0 rounded-2xl animate-pulse-glow pointer-events-none" />
                )}
              </div>
              <span className={cn(
                "text-[10px] font-bold mt-1 transition-colors duration-300",
                isActive ? "text-primary" : "text-orange-300"
              )}>
                {link.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
