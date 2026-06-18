import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { WORLDS } from "@/data/challenges";

export type WorldProgress = {
  missionsCompleted: number;
  questionsAnswered: number;
  crystalEarned: boolean;
};

export type GameState = {
  introSeen: boolean;
  currentWorld: number;
  worldProgress: Record<number, WorldProgress>;
  totalXP: number;
  totalStars: number;
  badges: string[];
  discoveryCards: number[];
  soundEnabled: boolean;
  totalCorrectAnswers: number;
  totalQuestionsAnswered: number;
};

type GameContextType = {
  state: GameState;
  completeIntro: () => void;
  answerQuestion: (worldId: number, missionIndex: number, correct: boolean) => void;
  completeMission: (worldId: number) => void;
  completeWorld: (worldId: number) => void;
  toggleSound: () => void;
  resetProgress: () => void;
};

const defaultState: GameState = {
  introSeen: false,
  currentWorld: 1,
  worldProgress: {
    1: { missionsCompleted: 0, questionsAnswered: 0, crystalEarned: false },
    2: { missionsCompleted: 0, questionsAnswered: 0, crystalEarned: false },
    3: { missionsCompleted: 0, questionsAnswered: 0, crystalEarned: false },
    4: { missionsCompleted: 0, questionsAnswered: 0, crystalEarned: false },
  },
  totalXP: 0,
  totalStars: 0,
  badges: [],
  discoveryCards: [],
  soundEnabled: true,
  totalCorrectAnswers: 0,
  totalQuestionsAnswered: 0,
};

const STORAGE_KEY = "pixora_state";

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...defaultState, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error("Failed to load game state", e);
    }
    return defaultState;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const updateState = (updates: Partial<GameState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const updateWorldProgress = (worldId: number, updates: Partial<WorldProgress>) => {
    setState((prev) => ({
      ...prev,
      worldProgress: {
        ...prev.worldProgress,
        [worldId]: {
          ...prev.worldProgress[worldId],
          ...updates,
        },
      },
    }));
  };

  const completeIntro = () => updateState({ introSeen: true });

  const answerQuestion = (worldId: number, _missionIndex: number, correct: boolean) => {
    setState((prev) => {
      const xpGain = correct ? 10 : 0;
      const starGain = correct ? 1 : 0;
      const wp = prev.worldProgress[worldId];

      const newBadges = [...prev.badges];
      if (prev.totalCorrectAnswers === 9 && !newBadges.includes("Explorer")) newBadges.push("Explorer");
      if (prev.totalCorrectAnswers === 18 && !newBadges.includes("Detective")) newBadges.push("Detective");

      return {
        ...prev,
        totalXP: prev.totalXP + xpGain,
        totalStars: prev.totalStars + starGain,
        totalCorrectAnswers: prev.totalCorrectAnswers + (correct ? 1 : 0),
        totalQuestionsAnswered: prev.totalQuestionsAnswered + 1,
        badges: newBadges,
        worldProgress: {
          ...prev.worldProgress,
          [worldId]: {
            ...wp,
            questionsAnswered: wp.questionsAnswered + 1,
          },
        },
      };
    });
  };

  const completeMission = (worldId: number) => {
    setState((prev) => {
      const wp = prev.worldProgress[worldId];
      return {
        ...prev,
        totalXP: prev.totalXP + 50,
        worldProgress: {
          ...prev.worldProgress,
          [worldId]: {
            ...wp,
            missionsCompleted: wp.missionsCompleted + 1,
          },
        },
      };
    });
  };

  const completeWorld = (worldId: number) => {
    setState((prev) => {
      const wp = prev.worldProgress[worldId];
      const nextWorld = Math.min(4, Math.max(prev.currentWorld, worldId + 1));
      return {
        ...prev,
        totalXP: prev.totalXP + 200,
        currentWorld: nextWorld,
        worldProgress: {
          ...prev.worldProgress,
          [worldId]: {
            ...wp,
            crystalEarned: true,
          },
        },
      };
    });
  };

  const toggleSound = () => updateState({ soundEnabled: !state.soundEnabled });

  const resetProgress = () => {
    setState(defaultState);
  };

  return (
    <GameContext.Provider
      value={{
        state,
        completeIntro,
        answerQuestion,
        completeMission,
        completeWorld,
        toggleSound,
        resetProgress,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within GameProvider");
  }
  return context;
}
