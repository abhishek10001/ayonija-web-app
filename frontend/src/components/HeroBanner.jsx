import React from 'react';

import { ArrowRight, FileSearch, Award, UserCheck, ShieldCheck } from 'lucide-react';

const HeroBanner = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-primary-dark to-primary-std text-white">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
          <path d="M0 4c0-2.2 1.8-4 4-4h24c2.2 0 4 1.8 4 4v24c0 2.2-1.8 4-4 4H4c-2.2 0-4-1.8-4-4V4z" 
                fill="currentColor" fillOpacity=".1"/>
        </svg>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="w-full md:w-1/2 md:pr-4 lg:pr-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6">
              Quality Healthcare <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">Products & Solutions</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-white/90">
              Trusted by healthcare professionals worldwide. Discover our extensive 
              range of pharmaceutical products designed to improve patient outcomes.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-6 sm:mb-8">
              <button className="flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-white text-primary-dark rounded-lg hover:bg-gray-100 transition-all duration-300 text-sm sm:text-base">
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </button>
              <button className="flex items-center px-4 sm:px-6 py-2 sm:py-3 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-all duration-300 text-sm sm:text-base">
                Learn More
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-10 border-t border-white/10 pt-8">
              {[
                { 
                  icon: <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 mb-2 text-white/90" />, 
                  title: "Quality Assured", 
                  desc: "ISO 9001:2015 certified" 
                },
                { 
                  icon: <FileSearch className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 mb-2 text-white/90" />, 
                  title: "Research Backed", 
                  desc: "Evidence-based solutions" 
                },
                { 
                  icon: <UserCheck className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 mb-2 text-white/90" />, 
                  title: "Customer Trust", 
                  desc: "98% satisfaction rate" 
                }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center sm:items-start text-center sm:text-left bg-white/5 p-3 sm:p-4 rounded-lg hover:bg-white/10 transition-all duration-300">
                  {item.icon}
                  <h3 className="font-semibold text-sm sm:text-base md:text-lg">{item.title}</h3>
                  <p className="text-white/80 text-xs sm:text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="w-full md:w-1/2 mt-8 md:mt-0">
            <div className="relative">
              {/* Placeholder for hero image - would be replaced with actual company image */}
              <div className="rounded-xl bg-white/10 backdrop-filter backdrop-blur-sm border border-white/20 shadow-2xl w-full aspect-[4/3] flex items-center justify-center hover:scale-[1.02] transition-transform duration-300">
                <div className="text-center text-white p-4 sm:p-6 md:p-8">
                  <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4">💊</div>
                  <div className="text-lg sm:text-xl md:text-2xl font-bold">PharmaHealth</div>
                  <div className="text-xs sm:text-sm md:text-base mt-1 sm:mt-2">Advancing healthcare together</div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-3 sm:-bottom-4 md:-bottom-6 -left-3 sm:-left-4 md:-left-6 w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 rounded-full bg-white/10 backdrop-blur-sm"></div>
              <div className="absolute -top-3 sm:-top-4 md:-top-6 -right-3 sm:-right-4 md:-right-6 w-16 h-16 sm:w-20 sm:h-20 md:w-32 md:h-32 rounded-full bg-white/5 backdrop-blur-sm"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;