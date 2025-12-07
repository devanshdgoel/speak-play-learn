import coralTop from "@/assets/coral-top.svg";
import seaweedLeft from "@/assets/seaweed-left.svg";
import seaweedRight from "@/assets/seaweed-right.svg";

const OceanBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Top right coral decoration - orange wavy ribbon coming from top-right corner */}
      <img 
        src={coralTop} 
        alt="" 
        className="absolute -top-16 -right-20 w-[400px] md:w-[500px] lg:w-[600px] h-auto z-0"
        style={{ transform: 'rotate(180deg) scaleX(-1)' }}
      />
      
      {/* Bottom right coral - curved wavy lines coming from bottom-right corner, matching design */}
      <svg 
        className="absolute -bottom-4 -right-4 w-[280px] md:w-[380px] lg:w-[450px] h-auto z-30"
        viewBox="0 0 350 280" 
        fill="none"
      >
        {/* Curved ribbon lines going from corner outward in a wave pattern */}
        <path d="M380 300 Q320 260 280 280 Q220 300 180 260 Q140 220 100 240 Q60 260 20 220 Q-20 180 -40 160" stroke="#D87645" strokeWidth="4.5" strokeLinecap="round" fill="none"/>
        <path d="M385 294 Q325 254 285 274 Q225 294 185 254 Q145 214 105 234 Q65 254 25 214 Q-15 174 -35 154" stroke="#D87645" strokeWidth="4.5" strokeLinecap="round" fill="none"/>
        <path d="M390 288 Q330 248 290 268 Q230 288 190 248 Q150 208 110 228 Q70 248 30 208 Q-10 168 -30 148" stroke="#D87645" strokeWidth="4.5" strokeLinecap="round" fill="none"/>
        <path d="M395 282 Q335 242 295 262 Q235 282 195 242 Q155 202 115 222 Q75 242 35 202 Q-5 162 -25 142" stroke="#D87645" strokeWidth="4.5" strokeLinecap="round" fill="none"/>
        <path d="M400 276 Q340 236 300 256 Q240 276 200 236 Q160 196 120 216 Q80 236 40 196 Q0 156 -20 136" stroke="#D87645" strokeWidth="4.5" strokeLinecap="round" fill="none"/>
        <path d="M405 270 Q345 230 305 250 Q245 270 205 230 Q165 190 125 210 Q85 230 45 190 Q5 150 -15 130" stroke="#D87645" strokeWidth="4.5" strokeLinecap="round" fill="none"/>
        <path d="M410 264 Q350 224 310 244 Q250 264 210 224 Q170 184 130 204 Q90 224 50 184 Q10 144 -10 124" stroke="#D87645" strokeWidth="4.5" strokeLinecap="round" fill="none"/>
        <path d="M415 258 Q355 218 315 238 Q255 258 215 218 Q175 178 135 198 Q95 218 55 178 Q15 138 -5 118" stroke="#D87645" strokeWidth="4.5" strokeLinecap="round" fill="none"/>
        <path d="M420 252 Q360 212 320 232 Q260 252 220 212 Q180 172 140 192 Q100 212 60 172 Q20 132 0 112" stroke="#D87645" strokeWidth="4.5" strokeLinecap="round" fill="none"/>
        <path d="M425 246 Q365 206 325 226 Q265 246 225 206 Q185 166 145 186 Q105 206 65 166 Q25 126 5 106" stroke="#D87645" strokeWidth="4.5" strokeLinecap="round" fill="none"/>
      </svg>
      
      {/* Main wave layer - higher up, taking most of the screen */}
      <svg 
        viewBox="0 0 1440 320" 
        className="absolute top-[35%] left-0 right-0 w-full h-auto z-10"
        preserveAspectRatio="none"
      >
        <path 
          fill="hsl(var(--background-wave))" 
          fillOpacity="0.6"
          d="M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,138.7C672,128,768,128,864,144C960,160,1056,192,1152,186.7C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
      </svg>
      
      {/* Bottom left seaweed - in front */}
      <img 
        src={seaweedLeft} 
        alt="" 
        className="absolute -bottom-8 -left-6 w-48 md:w-64 lg:w-80 h-auto animate-sway origin-bottom z-20"
      />
      
      {/* Bottom right seaweed - in front */}
      <img 
        src={seaweedRight} 
        alt="" 
        className="absolute -bottom-2 right-4 md:right-12 w-32 md:w-40 lg:w-48 h-auto animate-sway-delayed origin-bottom z-20"
      />
    </div>
  );
};

export default OceanBackground;
