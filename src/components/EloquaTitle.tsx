import eloquaLogo from "@/assets/eloqua-title.svg";

const EloquaTitle = () => {
  return (
    <div className="w-[600px] md:w-[800px] lg:w-[1000px] max-w-[90vw]">
      <img 
        src={eloquaLogo} 
        alt="ELOQUA" 
        className="w-full h-auto"
      />
    </div>
  );
};

export default EloquaTitle;
