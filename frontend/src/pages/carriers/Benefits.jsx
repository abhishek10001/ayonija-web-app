import React from 'react';
import { Heart, GraduationCap, Clock, Leaf, Microscope, Briefcase, Globe, Award, Shield } from 'lucide-react';

const Benefits = () => {
  const benefits = [
    {
      icon: <Heart className="text-primary-std h-8 w-8" />,
      title: "Comprehensive Healthcare",
      description: "Premium medical, dental, and vision coverage for you and your dependents with access to industry-leading specialists and treatments.",
      details: ["Global healthcare network", "Mental health support", "Family coverage", "Preventive care programs"]
    },
    {
      icon: <Microscope className="text-primary-std h-8 w-8" />,
      title: "Research & Innovation",
      description: "Opportunities to participate in groundbreaking research with dedicated time and resources for pursuing innovative projects.",
      details: ["Innovation grants", "Research sabbaticals", "Patent bonuses", "Conference funding"]
    },
    {
      icon: <GraduationCap className="text-primary-std h-8 w-8" />,
      title: "Professional Development",
      description: "Robust continuing education programs and specialized scientific training with tuition reimbursement and career advancement pathways.",
      details: ["Advanced degree support", "Scientific certification", "Leadership training", "Conference attendance"]
    },
    {
      icon: <Clock className="text-primary-std h-8 w-8" />,
      title: "Work-Life Balance",
      description: "Flexible work arrangements including remote options, generous PTO, and parental leave to support your personal and family needs.",
      details: ["Flexible scheduling", "Generous paid leave", "Sabbatical program", "Family support services"]
    },
    {
      icon: <Briefcase className="text-primary-std h-8 w-8" />,
      title: "Financial Wellness",
      description: "Competitive compensation with performance bonuses, robust retirement plans, and company stock options to secure your financial future.",
      details: ["Retirement matching", "Stock purchase plan", "Performance bonuses", "Financial counseling"]
    },
    {
      icon: <Leaf className="text-primary-std h-8 w-8" />,
      title: "Wellness Programs",
      description: "Comprehensive wellness initiatives including fitness memberships, nutrition counseling, and stress management resources.",
      details: ["Fitness stipend", "Mindfulness programs", "On-site fitness", "Health coaching"]
    },
    {
      icon: <Globe className="text-primary-std h-8 w-8" />,
      title: "Global Opportunities",
      description: "International career paths with opportunities for global assignments, cross-border collaboration, and cultural exchange programs.",
      details: ["International transfers", "Travel opportunities", "Language training", "Global projects"]
    },
    {
      icon: <Award className="text-primary-std h-8 w-8" />,
      title: "Recognition Programs",
      description: "Meaningful recognition for scientific achievements, innovation, and exceptional contributions to healthcare advancement.",
      details: ["Publication awards", "Patent recognition", "Impact bonuses", "Service awards"]
    },
    {
      icon: <Shield className="text-primary-std h-8 w-8" />,
      title: "Safety & Wellbeing",
      description: "Industry-leading safety protocols and a culture that prioritizes employee wellbeing across all research and operational settings.",
      details: ["Clinical safety training", "Mental health services", "Work environment audits", "Life assistance programs"]
    }
  ];

  return (
    <div className="py-20 bg-gradient-to-b from-neutral-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <span className="bg-primary-std/10 text-primary-std text-sm font-medium px-4 py-1.5 rounded-full inline-block mb-4">OUR COMMITMENT TO YOU</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-neutral-dark">
            Employee Benefits <span className="text-primary-std">& Wellness</span>
          </h1>
          <p className="text-neutral-std text-lg max-w-3xl mx-auto">
            At PharmaCorp, we believe our success begins with our people. We offer comprehensive benefits 
            designed to support our team's health, growth, and work-life balance while advancing 
            scientific innovation and healthcare excellence.
          </p>
        </div>

        {/* Horizontal scrolling container */}
        <div className="relative w-full mb-12">
          <div className="overflow-x-auto pb-6 hide-scrollbar">
            <div className="flex space-x-6 px-4 w-max">
              {benefits.map((benefit, index) => (
                <div 
                  key={index} 
                  className="bg-white p-6 md:p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-neutral-100 group flex-shrink-0 w-80"
                >
                  <div className="flex items-center mb-4">
                    <div className="p-3 rounded-lg bg-primary-std/10  group-hover:text-white transition-colors duration-300">
                      {benefit.icon}
                    </div>
                    <h2 className="text-xl font-semibold ml-4 text-neutral-dark">{benefit.title}</h2>
                  </div>
                  
                  <p className="text-neutral-std mb-5">{benefit.description}</p>
                  
                  <ul className="space-y-2">
                    {benefit.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center text-sm text-neutral-std">
                        <svg className="h-4 w-4 mr-2 text-primary-std" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          
          {/* Optional scroll indicators */}
         
        </div>

        
        
      </div>
    </div>
  );
};

export default Benefits;