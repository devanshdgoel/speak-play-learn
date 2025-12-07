import { useEffect, useState } from "react";

interface FishInstance {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  delay: number;
  color: string;
  fadeOut: boolean;
  pauseDuration: number;
  pauseAt: number; // percentage of journey when fish pauses
}

// Predefined fish groups with choreographed behaviors
const fishGroups: FishInstance[][] = [
  // Group 1: Top left area - 3 blue fish swimming together
  [
    { id: 1, x: -5, y: 25, size: 10, speed: 18, delay: 0, color: "#1e5f8a", fadeOut: false, pauseDuration: 0, pauseAt: 0 },
    { id: 2, x: -8, y: 28, size: 8, speed: 18, delay: 0.3, color: "#2a7ab0", fadeOut: false, pauseDuration: 0, pauseAt: 0 },
    { id: 3, x: -6, y: 22, size: 9, speed: 18, delay: 0.15, color: "#1e5f8a", fadeOut: false, pauseDuration: 0, pauseAt: 0 },
  ],
  // Group 2: Middle area - 2 orange fish, one fades out
  [
    { id: 4, x: -10, y: 55, size: 12, speed: 22, delay: 5, color: "#e07a4f", fadeOut: true, pauseDuration: 0, pauseAt: 0 },
    { id: 5, x: -14, y: 58, size: 10, speed: 22, delay: 5.4, color: "#e07a4f", fadeOut: false, pauseDuration: 0, pauseAt: 0 },
  ],
  // Group 3: Lower area - 4 small blue fish, some pause
  [
    { id: 6, x: -5, y: 72, size: 7, speed: 15, delay: 10, color: "#1e5f8a", fadeOut: false, pauseDuration: 2, pauseAt: 40 },
    { id: 7, x: -9, y: 75, size: 6, speed: 15, delay: 10.2, color: "#2a7ab0", fadeOut: false, pauseDuration: 2, pauseAt: 40 },
    { id: 8, x: -7, y: 69, size: 7, speed: 15, delay: 10.1, color: "#1e5f8a", fadeOut: false, pauseDuration: 2, pauseAt: 40 },
    { id: 9, x: -11, y: 73, size: 5, speed: 15, delay: 10.5, color: "#2a7ab0", fadeOut: false, pauseDuration: 2, pauseAt: 40 },
  ],
  // Group 4: Top right area - single yellow fish
  [
    { id: 10, x: -8, y: 18, size: 14, speed: 25, delay: 15, color: "#f0a030", fadeOut: false, pauseDuration: 3, pauseAt: 60 },
  ],
  // Group 5: Center - 2 fish that fade out mid-journey
  [
    { id: 11, x: -5, y: 45, size: 11, speed: 20, delay: 20, color: "#1e5f8a", fadeOut: true, pauseDuration: 0, pauseAt: 0 },
    { id: 12, x: -10, y: 48, size: 9, speed: 20, delay: 20.3, color: "#2a7ab0", fadeOut: true, pauseDuration: 0, pauseAt: 0 },
  ],
  // Group 6: Bottom area - 5 tiny fish school
  [
    { id: 13, x: -3, y: 82, size: 5, speed: 12, delay: 25, color: "#1e5f8a", fadeOut: false, pauseDuration: 0, pauseAt: 0 },
    { id: 14, x: -6, y: 84, size: 4, speed: 12, delay: 25.1, color: "#2a7ab0", fadeOut: false, pauseDuration: 0, pauseAt: 0 },
    { id: 15, x: -4, y: 80, size: 5, speed: 12, delay: 25.05, color: "#1e5f8a", fadeOut: false, pauseDuration: 0, pauseAt: 0 },
    { id: 16, x: -8, y: 83, size: 4, speed: 12, delay: 25.2, color: "#2a7ab0", fadeOut: false, pauseDuration: 0, pauseAt: 0 },
    { id: 17, x: -5, y: 86, size: 4, speed: 12, delay: 25.15, color: "#1e5f8a", fadeOut: false, pauseDuration: 0, pauseAt: 0 },
  ],
  // Group 7: High up - 3 fish with varied pause
  [
    { id: 18, x: -6, y: 15, size: 8, speed: 16, delay: 32, color: "#e07a4f", fadeOut: false, pauseDuration: 1.5, pauseAt: 30 },
    { id: 19, x: -10, y: 12, size: 10, speed: 16, delay: 32.2, color: "#f0a030", fadeOut: false, pauseDuration: 1.5, pauseAt: 30 },
    { id: 20, x: -8, y: 18, size: 7, speed: 16, delay: 32.1, color: "#e07a4f", fadeOut: false, pauseDuration: 1.5, pauseAt: 30 },
  ],
  // Group 8: Middle-low - 2 large slow fish
  [
    { id: 21, x: -12, y: 62, size: 16, speed: 30, delay: 40, color: "#1e5f8a", fadeOut: false, pauseDuration: 4, pauseAt: 50 },
    { id: 22, x: -18, y: 65, size: 14, speed: 30, delay: 40.8, color: "#2a7ab0", fadeOut: false, pauseDuration: 4, pauseAt: 50 },
  ],
];

const Fish = ({ fish }: { fish: FishInstance }) => {
  const animationName = fish.fadeOut ? "swim-fade" : fish.pauseDuration > 0 ? "swim-pause" : "swim-continuous";
  
  return (
    <svg
      viewBox="0 0 24 16"
      fill="none"
      className="absolute pointer-events-none"
      style={{
        width: fish.size * 3,
        height: fish.size * 2,
        left: `${fish.x}%`,
        top: `${fish.y}%`,
        transform: "scaleX(-1)", // Flip to swim right
        animation: `${animationName} ${fish.speed}s linear infinite`,
        animationDelay: `${fish.delay}s`,
        zIndex: 0,
      }}
    >
      {/* Body */}
      <ellipse cx="10" cy="8" rx="8" ry="5" fill={fish.color} />
      {/* Tail */}
      <path d="M18 8L24 3V13L18 8Z" fill={fish.color} />
      {/* Eye */}
      <circle cx="6" cy="7" r="1.5" fill="white" />
      <circle cx="6" cy="7" r="0.8" fill="#333" />
      {/* Fin */}
      <path d="M10 3L12 0L14 3" fill={fish.color} opacity="0.8" />
    </svg>
  );
};

const BackgroundFish = () => {
  const allFish = fishGroups.flat();
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
      {allFish.map((fish) => (
        <Fish key={fish.id} fish={fish} />
      ))}
    </div>
  );
};

export default BackgroundFish;
