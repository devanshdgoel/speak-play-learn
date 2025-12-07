import { useState, useEffect } from "react";

const PROGRESS_KEY = "eloqua_game_progress";
const INITIAL_COMPLETED = 4; // Start with first 4 levels completed

export const useGameProgress = () => {
  const [completedLevels, setCompletedLevels] = useState<number>(INITIAL_COMPLETED);

  useEffect(() => {
    const saved = localStorage.getItem(PROGRESS_KEY);
    if (saved) {
      setCompletedLevels(parseInt(saved, 10));
    } else {
      // Set initial progress if nothing saved
      localStorage.setItem(PROGRESS_KEY, INITIAL_COMPLETED.toString());
    }
  }, []);

  const completeCurrentLevel = () => {
    const newProgress = completedLevels + 1;
    setCompletedLevels(newProgress);
    localStorage.setItem(PROGRESS_KEY, newProgress.toString());
  };

  const resetProgress = () => {
    setCompletedLevels(INITIAL_COMPLETED);
    localStorage.setItem(PROGRESS_KEY, INITIAL_COMPLETED.toString());
  };

  return { completedLevels, completeCurrentLevel, resetProgress };
};
