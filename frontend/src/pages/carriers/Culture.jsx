import React from 'react';

const Culture = () => {
  const cultureValues = [
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Innovation",
      description: "We foster a culture of creativity and forward-thinking solutions, encouraging our team to push boundaries and explore new possibilities in healthcare.",
      highlights: ["Research excellence", "Creative problem-solving", "Continuous improvement", "Technology adoption"]
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Diversity & Inclusion",
      description: "Our strength lies in our differences. We create an inclusive environment where every voice is heard and valued.",
      highlights: ["Equal opportunities", "Cultural awareness", "Inclusive leadership", "Community engagement"]
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Social Responsibility",
      description: "We're committed to making a positive impact in our communities and advancing global healthcare solutions.",
      highlights: ["Community outreach", "Environmental sustainability", "Ethical practices", "Global health initiatives"]
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Global Collaboration",
      description: "Working together across borders to solve complex healthcare challenges and share knowledge worldwide.",
      highlights: ["International partnerships", "Cross-cultural teams", "Global research", "Knowledge sharing"]
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Excellence",
      description: "We strive for the highest standards in everything we do, from research to patient care.",
      highlights: ["Quality assurance", "Professional development", "Industry leadership", "Best practices"]
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Work-Life Balance",
      description: "We believe in supporting our team's wellbeing through flexible work arrangements and comprehensive support programs.",
      highlights: ["Flexible scheduling", "Wellness programs", "Family support", "Mental health resources"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary-dark to-primary-std text-white py-20">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
            <path d="M0 4c0-2.2 1.8-4 4-4h24c2.2 0 4 1.8 4 4v24c0 2.2-1.8 4-4 4H4c-2.2 0-4-1.8-4-4V4z" 
                  fill="currentColor" fillOpacity=".1"/>
          </svg>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="bg-white/10 text-white text-sm font-medium px-4 py-1.5 rounded-full inline-block mb-4">
              OUR CULTURE
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Building a Better Future <span className="text-white/80">Together</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90">
              At PharmaCorp, our culture is built on innovation, diversity, and a shared commitment to improving global healthcare.
            </p>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cultureValues.map((value, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-neutral-100 group"
            >
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-xl bg-primary-std/10 text-primary-std group-hover:bg-primary-std group-hover:text-white transition-colors duration-300">
                  {value.icon}
                </div>
                <h2 className="text-2xl font-semibold ml-4 text-neutral-dark">{value.title}</h2>
              </div>
              <p className="text-neutral-std mb-6">{value.description}</p>
              <ul className="space-y-3">
                {value.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-center text-sm text-neutral-std">
                    <svg className="h-4 w-4 mr-2 text-primary-std" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="bg-primary-std/5 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-8">
              <svg width="120" height="30" viewBox="0 0 120 30" className="text-primary-std/20">
                <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" fill="currentColor" transform="translate(0,0)" />
                <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" fill="currentColor" transform="translate(24,0)" />
                <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" fill="currentColor" transform="translate(48,0)" />
                <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" fill="currentColor" transform="translate(72,0)" />
                <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" fill="currentColor" transform="translate(96,0)" />
              </svg>
            </div>
            <blockquote className="text-xl md:text-2xl italic text-neutral-dark max-w-3xl mx-auto mb-6">
              "The culture at PharmaCorp is truly unique. It's a place where innovation meets compassion, and where every team member's contribution is valued. The collaborative environment and commitment to excellence make it an inspiring place to work."
            </blockquote>
            <div className="flex items-center justify-center">
              <div className="h-12 w-12 rounded-full bg-primary-std/20 flex items-center justify-center text-primary-std font-bold text-lg">JD</div>
              <div className="ml-3 text-left">
                <p className="font-medium text-neutral-dark">Dr. Jane Doe</p>
                <p className="text-sm text-neutral-std">Senior Research Scientist, 6 years at PharmaCorp</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="container mx-auto px-4 py-20">
        <div className="bg-primary-std/5 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-semibold text-neutral-dark mb-2">Join Our Team</h3>
              <p className="text-neutral-std">Be part of a culture that values innovation, diversity, and making a difference in healthcare.</p>
            </div>
            <div className="flex space-x-4">
              <button className="px-6 py-3 bg-white text-primary-std font-medium rounded-lg hover:bg-neutral-50 transition-colors shadow-sm">
                View Open Positions
              </button>
              <button className="px-6 py-3 bg-primary-std text-white font-medium rounded-lg hover:bg-primary-dark transition-colors shadow-sm">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Culture; 