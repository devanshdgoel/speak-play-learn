import { useNavigate } from "react-router-dom";
import eloquaLogo from "@/assets/eloqua-title.svg";
import trophyIcon from "@/assets/trophy-icon.svg";
import lightbulbIcon from "@/assets/lightbulb-icon.svg";
import settingsIcon from "@/assets/settings-icon.svg";
import fireStreak from "@/assets/fire-streak.svg";
import { Trophy, Check, X, ArrowRight } from "lucide-react";

const ProgressReport = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleTrophyClick = () => {
    navigate("/home");
  };

  // Weekly activity data
  const weeklyData = [
    { day: "Mon", activities: [true, true, true, true] },
    { day: "Tues", activities: [true, false, false, true] },
    { day: "Wed", activities: [false, true, false, true] },
    { day: "Thurs", activities: [false, true, true, false] },
    { day: "Fri", activities: [true, true, false, true] },
    { day: "Sat", activities: [true, false, true, true] },
    { day: "Sun", activities: [true, false, true, true] },
  ];

  // Bar chart data (random heights for visualization)
  const barData = [35, 65, 55, 45, 50, 40, 55, 35, 45, 60, 50, 45, 55, 40, 50, 45, 55, 65, 35, 55];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Fixed Header bar */}
      <header className="fixed top-0 left-0 right-0 z-20 px-4 md:px-8 py-3 flex items-center justify-between">
        {/* Logo - clickable to reset and go back to start */}
        <button onClick={handleLogoClick} className="hover:opacity-80 transition-opacity">
          <img src={eloquaLogo} alt="ELOQUA" className="h-10 md:h-14 w-auto" />
        </button>

        {/* Nav bar */}
        <nav className="flex-1 mx-6 md:mx-12 flex items-center justify-between bg-[hsl(181_69%_42%)] rounded-full md:px-10 py-2 md:py-2.5 shadow-lg px-[70px]">
          <button 
            onClick={handleTrophyClick}
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors mx-[40px]"
          >
            <img src={trophyIcon} alt="Trophies" className="w-6 h-6 md:w-8 md:h-8" />
          </button>
          <button className="p-1.5 hover:bg-white/10 rounded-full transition-colors">
            <img src={lightbulbIcon} alt="Tips" className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <button className="p-1.5 hover:bg-white/10 rounded-full transition-colors">
            <img src={settingsIcon} alt="Settings" className="w-6 h-6 md:w-8 md:h-8" />
          </button>
          <div className="flex items-center gap-1">
            <img src={fireStreak} alt="Streak" className="w-5 h-7 md:w-6 md:h-9" />
            <span className="text-white font-bold text-base md:text-lg">13</span>
          </div>
        </nav>

        {/* Profile circle */}
        <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-accent border-4 border-white/20 shadow-lg" />
      </header>

      {/* Main Content */}
      <main className="pt-24 px-6 md:px-12 pb-8">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-primary text-center mb-8" style={{ fontFamily: 'Fredoka, sans-serif' }}>
          Progress Report
        </h1>

        {/* Middle Section - Achievements and Metrics */}
        <div className="flex flex-col lg:flex-row items-start justify-center gap-6 mb-8">
          {/* Achievements Card */}
          <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-100 min-w-[200px]">
            <h2 className="text-primary font-bold text-xl mb-4" style={{ fontFamily: 'Fredoka, sans-serif' }}>
              Achievements
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Trophy className="w-7 h-7 text-gray-400" />
                <span className="text-gray-700 text-sm">3 ll's in a row</span>
              </div>
              <div className="flex items-center gap-3">
                <Trophy className="w-7 h-7 text-gray-400" />
                <span className="text-gray-700 text-sm">Saved 4 jellyfish</span>
              </div>
              <div className="flex items-center gap-3">
                <Trophy className="w-7 h-7 text-gray-400" />
                <span className="text-gray-700 text-sm">7-Day Streak</span>
              </div>
            </div>
          </div>

          {/* Circular Progress Metrics */}
          <div className="flex items-center gap-2">
            {/* Pronunciation Accuracy */}
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" stroke="hsl(168 45% 85%)" strokeWidth="8" fill="none" />
                  <circle 
                    cx="50" cy="50" r="42" 
                    stroke="hsl(24 80% 55%)" 
                    strokeWidth="8" 
                    fill="none" 
                    strokeLinecap="round"
                    strokeDasharray={`${80 * 2.64} ${100 * 2.64}`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-primary">80</span>
                </div>
              </div>
              <span className="text-sm text-gray-600 text-center mt-1">Pronunciation<br/>Accuracy</span>
            </div>

            {/* Connecting line */}
            <div className="w-8 h-1 bg-primary rounded-full" />

            {/* Volume Consistency */}
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" stroke="hsl(168 45% 85%)" strokeWidth="8" fill="none" />
                  <circle 
                    cx="50" cy="50" r="42" 
                    stroke="hsl(24 80% 55%)" 
                    strokeWidth="8" 
                    fill="none" 
                    strokeLinecap="round"
                    strokeDasharray={`${42 * 2.64} ${100 * 2.64}`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-primary">42</span>
                </div>
              </div>
              <span className="text-sm text-gray-600 text-center mt-1">Volume<br/>Consistency</span>
            </div>

            {/* Connecting line */}
            <div className="w-8 h-1 bg-primary rounded-full" />

            {/* Tone Stability */}
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" stroke="hsl(168 45% 85%)" strokeWidth="8" fill="none" />
                  <circle 
                    cx="50" cy="50" r="42" 
                    stroke="hsl(24 80% 55%)" 
                    strokeWidth="8" 
                    fill="none" 
                    strokeLinecap="round"
                    strokeDasharray={`${65 * 2.64} ${100 * 2.64}`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-primary">65</span>
                </div>
              </div>
              <span className="text-sm text-gray-600 text-center mt-1">Tone<br/>Stability</span>
            </div>

            {/* Arrow and CTA */}
            <div className="flex items-center gap-4 ml-4">
              <ArrowRight className="w-10 h-10 text-primary" strokeWidth={3} />
              <div className="text-right">
                <p className="text-gray-700 text-sm mb-2">
                  Want more insights<br/>on your child's<br/>speech health?
                </p>
                <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors">
                  Send Report
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Weekly Table and Bar Chart */}
        <div className="flex flex-col lg:flex-row items-start justify-center gap-8">
          {/* Weekly Activity Table */}
          <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200">
            <table className="border-collapse">
              <thead>
                <tr>
                  {weeklyData.map((day) => (
                    <th key={day.day} className="border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50">
                      {day.day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[0, 1, 2, 3].map((rowIndex) => (
                  <tr key={rowIndex}>
                    {weeklyData.map((day, colIndex) => (
                      <td key={colIndex} className="border border-gray-200 px-4 py-2 text-center">
                        {day.activities[rowIndex] ? (
                          <Check className="w-5 h-5 text-primary mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-primary mx-auto" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bar Chart */}
          <div className="flex flex-col items-center">
            <div className="flex items-end gap-1 h-40">
              {barData.map((height, index) => (
                <div
                  key={index}
                  className="w-4 bg-primary rounded-t-md"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
            <div className="flex items-center mt-2">
              <span className="text-xs text-gray-500 -rotate-90 -mr-2" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}>
                Number of Excercises
              </span>
              <span className="text-sm text-gray-600 ml-8">Day</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProgressReport;
