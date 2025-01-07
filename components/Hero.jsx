import { HoverBorderGradient } from "./ui/hover-border-gradient";
import { SparklesCore } from "./ui/sparkles";

const Hero = () => {
  return (
    <div>
      <div className="flex items-center flex-col justify-center">
        <div className="h-[40rem] w-full bg-black flex flex-col items-center justify-center overflow-hidden ">
          <h1 className="bg-clip-text text-transparent text-center text-white dark:text-black text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-6 relative z-20 font-bold tracking-tight">
            Create, Share, and Vote on Lists
          </h1>
          <p className="font-sans text-white">
            WhatTo helps you make decisions collaboratively. Create lists, share
            them with friends, and vote on the best options.
          </p>
          <div className="w-[40rem] h-40 relative">
            {/* Gradients */}
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

            {/* Core component */}
            <SparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1}
              particleDensity={1200}
              className="w-full h-full"
              particleColor="#FFFFFF"
            />

            {/* Radial Gradient to prevent sharp edges */}
            <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
