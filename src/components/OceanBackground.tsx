import coralTop from "@/assets/coral-top.svg";
import coralBottom from "@/assets/coral-bottom.svg";
import seaweedLeft from "@/assets/seaweed-left.svg";
import seaweedRight from "@/assets/seaweed-right.svg";

const OceanBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Top right coral decoration */}
      <img 
        src={coralTop} 
        alt="" 
        className="absolute -top-20 -right-40 w-[500px] md:w-[672px] h-auto opacity-90 rotate-12"
      />
      
      {/* Bottom right coral decoration */}
      <img 
        src={coralBottom} 
        alt="" 
        className="absolute -bottom-20 -right-60 w-[500px] md:w-[700px] h-auto opacity-80 rotate-180"
      />
      
      {/* Wave layers */}
      <div className="absolute bottom-0 left-0 right-0 h-40 md:h-56">
        <svg 
          viewBox="0 0 1440 320" 
          className="absolute bottom-32 w-full h-32 animate-wave"
          preserveAspectRatio="none"
        >
          <path 
            fill="hsl(var(--background-wave))" 
            fillOpacity="0.6"
            d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,176C672,181,768,139,864,128C960,117,1056,139,1152,154.7C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>
      
      {/* Bottom left seaweed */}
      <img 
        src={seaweedLeft} 
        alt="" 
        className="absolute -bottom-48 -left-10 w-48 md:w-72 h-auto animate-sway origin-bottom"
      />
      
      {/* Bottom right seaweed */}
      <img 
        src={seaweedRight} 
        alt="" 
        className="absolute -bottom-32 right-10 w-32 md:w-44 h-auto animate-sway-delayed origin-bottom"
      />
    </div>
  );
};

export default OceanBackground;
