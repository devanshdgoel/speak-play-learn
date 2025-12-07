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
      
      {/* Bottom right coral - diagonal wavy lines from top-right to bottom-left */}
      <svg 
        className="absolute bottom-0 right-0 w-[320px] md:w-[420px] lg:w-[500px] h-[280px] md:h-[350px] lg:h-[400px] z-30"
        viewBox="0 0 400 350" 
        fill="none"
        preserveAspectRatio="none"
      >
        {/* Diagonal curved ribbon lines going from top-right corner down to bottom-left */}
        <path d="M420 -20 Q380 60 340 100 Q280 160 240 200 Q180 260 120 290 Q60 330 0 360" stroke="#D87645" strokeWidth="4.5" strokeLinecap="round" fill="none"/>
        <path d="M426 -14 Q386 66 346 106 Q286 166 246 206 Q186 266 126 296 Q66 336 6 366" stroke="#D87645" strokeWidth="4.5" strokeLinecap="round" fill="none"/>
        <path d="M432 -8 Q392 72 352 112 Q292 172 252 212 Q192 272 132 302 Q72 342 12 372" stroke="#D87645" strokeWidth="4.5" strokeLinecap="round" fill="none"/>
        <path d="M438 -2 Q398 78 358 118 Q298 178 258 218 Q198 278 138 308 Q78 348 18 378" stroke="#D87645" strokeWidth="4.5" strokeLinecap="round" fill="none"/>
        <path d="M444 4 Q404 84 364 124 Q304 184 264 224 Q204 284 144 314 Q84 354 24 384" stroke="#D87645" strokeWidth="4.5" strokeLinecap="round" fill="none"/>
        <path d="M450 10 Q410 90 370 130 Q310 190 270 230 Q210 290 150 320 Q90 360 30 390" stroke="#D87645" strokeWidth="4.5" strokeLinecap="round" fill="none"/>
        <path d="M456 16 Q416 96 376 136 Q316 196 276 236 Q216 296 156 326 Q96 366 36 396" stroke="#D87645" strokeWidth="4.5" strokeLinecap="round" fill="none"/>
        <path d="M462 22 Q422 102 382 142 Q322 202 282 242 Q222 302 162 332 Q102 372 42 402" stroke="#D87645" strokeWidth="4.5" strokeLinecap="round" fill="none"/>
        <path d="M468 28 Q428 108 388 148 Q328 208 288 248 Q228 308 168 338 Q108 378 48 408" stroke="#D87645" strokeWidth="4.5" strokeLinecap="round" fill="none"/>
        <path d="M474 34 Q434 114 394 154 Q334 214 294 254 Q234 314 174 344 Q114 384 54 414" stroke="#D87645" strokeWidth="4.5" strokeLinecap="round" fill="none"/>
      </svg>
      
      {/* Main wave layer - fills from wave line to bottom of screen */}
      <svg 
        viewBox="0 0 1440 600" 
        className="absolute top-[30%] left-0 right-0 w-full h-[70%] z-10"
        preserveAspectRatio="none"
      >
        <path 
          fill="hsl(var(--background-wave))" 
          fillOpacity="0.6"
          d="M0,80L48,96C96,112,192,144,288,149.3C384,155,480,133,576,122.7C672,112,768,112,864,128C960,144,1056,176,1152,170.7C1248,165,1344,123,1392,101.3L1440,80L1440,600L0,600Z"
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
