import { createContext, useContext, useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

type User = { name: string; avatar: string; };

type AuthContextType = {
  user: User | null;
  login: (name: string) => void;
  logout: () => void;
  showLoginModal: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
};

const AUTH_KEY = "pixora_user";
const AuthContext = createContext<AuthContextType | undefined>(undefined);
const AVATARS = ["🦊", "🐼", "🦁", "🐸", "🐉", "🦋", "🐨", "🦄", "🐯", "🐺"];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(AUTH_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });
  const [showLoginModal, setShowLoginModal] = useState(false);

  const login = (name: string) => {
    const u: User = {
      name: name.trim() || "Explorer",
      avatar: AVATARS[Math.floor(Math.random() * AVATARS.length)],
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(u));
    setUser(u);
    setShowLoginModal(false);
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user, login, logout,
      showLoginModal,
      openLoginModal: () => setShowLoginModal(true),
      closeLoginModal: () => setShowLoginModal(false),
    }}>
      {children}
      <AnimatePresence>
        {showLoginModal && <LoginModal />}
      </AnimatePresence>
    </AuthContext.Provider>
  );
}

function LoginModal() {
  const { login, logout, closeLoginModal, user } = useAuth();
  const [name, setName] = useState(user?.name ?? "");

  return (
    <motion.div
      className="fixed inset-0 z-[999] flex items-end justify-center"
      style={{ background: "rgba(5,4,20,0.85)", backdropFilter: "blur(12px)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={closeLoginModal}
    >
      <motion.div
        className="w-full max-w-[480px] rounded-t-[28px] px-6 pt-6 pb-10"
        style={{
          background: "linear-gradient(160deg, #1a1040 0%, #0d1f4a 60%, #071a2e 100%)",
          borderTop: "1.5px solid rgba(255,255,255,0.15)",
          boxShadow: "0 -20px 60px rgba(0,0,0,0.6)",
        }}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 280, damping: 28 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="mx-auto w-10 h-1 rounded-full bg-white/20 mb-6" />

        {user ? (
          <>
            <h2 className="text-2xl font-heading font-bold text-white mb-1 text-center">
              {user.avatar} {user.name}
            </h2>
            <p className="text-white/40 text-xs text-center mb-8">Logged in as a PIXORA Explorer</p>
            <div className="space-y-3">
              <button
                className="w-full py-4 rounded-2xl font-black text-sm text-white/80"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}
                onClick={closeLoginModal}
              >
                ✅ Continue Playing
              </button>
              <button
                className="w-full py-4 rounded-2xl font-black text-sm text-red-400"
                style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}
                onClick={logout}
              >
                🚪 Log Out
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-heading font-bold text-white mb-1 text-center">👋 Join PIXORA</h2>
            <p className="text-white/40 text-xs text-center mb-6">Save your progress and track achievements</p>

            {/* Name input */}
            <div className="mb-4">
              <label className="text-white/50 text-xs font-bold uppercase tracking-wider mb-2 block">Your Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                onKeyDown={e => e.key === "Enter" && name.trim() && login(name)}
                placeholder="Enter your explorer name…"
                maxLength={20}
                className="w-full px-4 py-3 rounded-2xl text-white font-bold text-sm outline-none"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  caretColor: "#FF7A59",
                }}
              />
            </div>

            <motion.button
              onClick={() => login(name)}
              disabled={!name.trim()}
              className="w-full py-4 rounded-2xl font-black text-white text-base mb-3 disabled:opacity-40 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #FF7A59 0%, #FF4D6D 50%, #C9184A 100%)",
                boxShadow: "0 4px 20px rgba(255,122,89,0.4)",
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              🚀 Start Adventure
            </motion.button>

            <div className="relative flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-white/30 text-xs font-bold">OR</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Coming soon options */}
            {[
              { icon: "🔵", label: "Continue with Google", sub: "Coming Soon" },
              { icon: "⚫", label: "Continue with Apple", sub: "Coming Soon" },
            ].map(opt => (
              <button
                key={opt.label}
                className="w-full py-3.5 rounded-2xl font-bold text-sm text-white/40 mb-2 flex items-center gap-3 px-4 cursor-not-allowed"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                disabled
              >
                <span className="text-xl">{opt.icon}</span>
                <span className="flex-1 text-left">{opt.label}</span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-white/10 text-white/30">
                  {opt.sub}
                </span>
              </button>
            ))}

            <p className="text-center text-white/20 text-[10px] mt-4">
              No account required — just enter your name to start!
            </p>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
