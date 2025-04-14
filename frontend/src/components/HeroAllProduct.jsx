// import React from 'react';
// import { Search, Filter, ArrowRight } from 'lucide-react';

// const HeroAllProduct = () => {
//   return (
//     <div className="relative overflow-hidden bg-gradient-to-br from-primary-dark via-primary-std to-primary-dark text-white">
//       {/* Background pattern */}
//       <div className="absolute inset-0 opacity-5">
//         <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
//           <path d="M0 4c0-2.2 1.8-4 4-4h24c2.2 0 4 1.8 4 4v24c0 2.2-1.8 4-4 4H4c-2.2 0-4-1.8-4-4V4z" 
//                 fill="currentColor" fillOpacity=".1"/>
//         </svg>
//       </div>
      
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 relative z-10">
//         <div className="max-w-4xl mx-auto text-center">
//           <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
//             Explore Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">Product Range</span>
//           </h1>
          
//           <p className="text-lg sm:text-xl md:text-2xl mb-8 text-white/90">
//             Discover our comprehensive selection of healthcare products, 
//             carefully curated to meet your professional needs.
//           </p>
          
          
          
//           {/* Quick Categories */}
//           <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
//             {[
//               { name: "Supplements", count: "120+" },
//               { name: "Equipment", count: "85+" },
//               { name: "Diagnostics", count: "45+" },
//               { name: "Accessories", count: "60+" }
//             ].map((category, idx) => (
//               <div key={idx} className="bg-white/5 hover:bg-white/10 p-4 rounded-xl border border-white/10 transition-all duration-300 cursor-pointer group">
//                 <div className="flex items-center justify-between">
//                   <span className="font-medium">{category.name}</span>
//                   <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                 </div>
//                 <div className="text-sm text-white/60 mt-1">{category.count} products</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroAllProduct; 



import React from 'react';
import { Search, Filter, ArrowRight, Heart, Pill, Stethoscope, Thermometer } from 'lucide-react';

export const HeroAllProduct = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary-dark via-primary-std to-primary-dark text-white py-16 md:py-24">
      {/* Abstract pharmaceutical background patterns */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full">
          {/* DNA Helix Pattern */}
          <svg className="h-full w-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M10,30 Q50,10 90,30 T90,70 Q50,90 10,70 T10,30" 
                  fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.8"/>
            <path d="M10,35 Q50,15 90,35 T90,65 Q50,85 10,65 T10,35" 
                  fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.6"/>
            <path d="M10,40 Q50,20 90,40 T90,60 Q50,80 10,60 T10,40" 
                  fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.4"/>
          </svg>
        </div>
        
        {/* Hexagonal molecular structure pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern id="molecularPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <polygon points="20,0 40,10 40,30 20,40 0,30 0,10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#molecularPattern)" />
          </svg>
        </div>
      </div>
      
      {/* Animated pill shapes */}
      <div className="absolute top-20 left-10 w-12 h-24 rounded-full bg-white/5 rotate-45 animate-pulse"></div>
      <div className="absolute bottom-16 right-16 w-12 h-24 rounded-full bg-white/5 rotate-12 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-8 h-16 rounded-full bg-white/5 -rotate-30 animate-pulse"></div>
      
      {/* Circular medical icons */}
      <div className="absolute top-1/4 left-1/6 w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
        <Pill className="w-8 h-8 text-white/20" />
      </div>
      <div className="absolute bottom-1/4 right-1/6 w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
        <Heart className="w-8 h-8 text-white/20" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <div className="relative inline-block">
              <div className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-blue-400/50 animate-pulse"></div>
              <div className="absolute -bottom-2 -right-2 w-4 h-4 rounded-full bg-green-400/50 animate-pulse delay-75"></div>
              <span className="inline-block px-4 py-1 rounded-full bg-white/10 text-sm font-medium tracking-wider">
                HEALTHCARE SOLUTIONS
              </span>
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
            Explore Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-green-200">Product Range</span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl mb-8 text-white/90">
            Discover our comprehensive selection of healthcare products, 
            carefully curated to meet your professional needs.
          </p>
          
          {/* Search bar with icon */}
          {/* <div className="relative max-w-2xl mx-auto mb-12">
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full p-1 border border-white/20">
              <div className="pl-4">
                <Search className="h-5 w-5 text-white/70" />
              </div>
              <input
                type="text"
                placeholder="Search for products, categories, or brands..."
                className="w-full bg-transparent py-3 px-4 outline-none text-white placeholder-white/60"
              />
              <button className="ml-auto bg-white text-primary-dark hover:bg-white/90 transition-colors rounded-full py-2 px-6 font-medium flex items-center gap-2">
                Search
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div> */}
          
          {/* Quick Categories with improved styling */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            {[
              { name: "Supplements", count: "120+", icon: <Pill className="h-5 w-5" /> },
              { name: "Equipment", count: "85+", icon: <Stethoscope className="h-5 w-5" /> },
              { name: "Diagnostics", count: "45+", icon: <Thermometer className="h-5 w-5" /> },
              { name: "Accessories", count: "60+", icon: <Heart className="h-5 w-5" /> }
            ].map((category, idx) => (
              <div key={idx} className="bg-white/5 hover:bg-white/10 p-4 rounded-xl border border-white/10 transition-all duration-300 cursor-pointer group hover:scale-105">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {category.icon}
                    <span className="font-medium">{category.name}</span>
                  </div>
                  <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                    <ArrowRight className="h-3 w-3 opacity-70 group-hover:opacity-100" />
                  </div>
                </div>
                <div className="text-sm text-white/60 mt-1 pl-7">{category.count} products</div>
              </div>
            ))}
          </div>
          
          {/* Featured tags */}
          <div className="flex flex-wrap justify-center gap-2 mt-10">
            {["Antibiotics", "Vitamins", "Pain Relief", "First Aid", "Medical Devices"].map((tag, idx) => (
              <span key={idx} className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded-full text-sm cursor-pointer transition-all duration-300">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.47,118.92,150.61,81.44,321.39,56.44Z" fill="white" fillOpacity="0.05"></path>
        </svg>
      </div>
    </div>
  );
};

export default HeroAllProduct;