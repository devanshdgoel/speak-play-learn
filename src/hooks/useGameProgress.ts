import { useState, useEffect } from "react";

const PROGRESS_KEY = "eloqua_game_progress";

export const useGameProgress = () => {
  const [completedLevels, setCompletedLevels] = useState<number>(0);

  useEffect(() => {
    const saved = localStorage.getItem(PROGRESS_KEY);
    if (saved) {
      setCompletedLevels(parseInt(saved, 10));
    }
  }, []);

  const completeLevel = (level: number) => {
    const newProgress = Math.max(completedLevels, level);
    setCompletedLevels(newProgress);
    localStorage.setItem(PROGRESS_KEY, newProgress.toString());
  };

  const resetProgress = () => {
    setCompletedLevels(0);
    localStorage.removeItem(PROGRESS_KEY);
  };

  return { completedLevels, completeLevel, resetProgress };
};
