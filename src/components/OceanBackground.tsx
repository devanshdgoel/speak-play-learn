import coralTop from "@/assets/coral-top.svg";
import coralBottom from "@/assets/coral-bottom.svg";
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
      
      {/* Bottom right coral decoration - orange wavy ribbon at bottom-right corner - behind seaweed */}
      <img 
        src={coralBottom} 
        alt="" 
        className="absolute -bottom-8 right-8 w-[350px] md:w-[450px] lg:w-[550px] h-auto z-0"
        style={{ transform: 'scaleX(-1)' }}
      />
      
      {/* Wave layer in the middle-bottom area */}
      <svg 
        viewBox="0 0 1440 200" 
        className="absolute bottom-32 md:bottom-40 left-0 right-0 w-full h-24 md:h-32 animate-wave z-10"
        preserveAspectRatio="none"
      >
        <path 
          fill="hsl(var(--background-wave))" 
          fillOpacity="0.5"
          d="M0,80L60,90C120,100,240,120,360,115C480,110,600,80,720,75C840,70,960,90,1080,100C1200,110,1320,110,1380,110L1440,110L1440,200L1380,200C1320,200,1200,200,1080,200C960,200,840,200,720,200C600,200,480,200,360,200C240,200,120,200,60,200L0,200Z"
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
