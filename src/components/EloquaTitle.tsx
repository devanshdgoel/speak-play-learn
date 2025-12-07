const EloquaTitle = () => {
  return (
    <div className="relative">
      {/* Shadow layer */}
      <h1 
        className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-wider select-none absolute top-2 left-1"
        style={{
          color: 'hsl(var(--title-shadow))',
          WebkitTextStroke: '3px hsl(var(--title-shadow))',
        }}
        aria-hidden="true"
      >
        ELOQUA
      </h1>
      
      {/* Main title with texture effect */}
      <h1 
        className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-wider select-none relative"
        style={{
          background: 'linear-gradient(180deg, hsl(175 50% 55%) 0%, hsl(181 50% 38%) 50%, hsl(181 60% 30%) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          filter: 'drop-shadow(2px 4px 0px hsl(var(--title-shadow)))',
        }}
      >
        ELOQUA
      </h1>
    </div>
  );
};

export default EloquaTitle;
