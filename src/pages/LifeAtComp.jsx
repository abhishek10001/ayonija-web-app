import React from "react";

const LifeAtCompany = () => {
  return (
    <div className="bg-gray-50 py-16 px-6 md:px-16 lg:px-24">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl font-extrabold text-gray-900">Life at Our Company</h1>
        <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
          Discover what makes our workplace special, our culture, and the experiences we offer to our employees.
        </p>
      </div>

      {/* Company Culture */}
      <div className="mt-16 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 bg-white shadow-xl rounded-lg p-8">
        <div>
          <h2 className="text-3xl font-semibold text-gray-900">Our Culture</h2>
          <p className="mt-4 text-gray-700">
            We foster an inclusive and diverse work environment that values collaboration, innovation, and personal growth.
          </p>
        </div>
        <div>
          <img
            src="https://source.unsplash.com/600x400/?office,teamwork"
            alt="Company Culture"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Employee Benefits */}
      <div className="mt-16 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 bg-white shadow-xl rounded-lg p-8">
        <div>
          <img
            src="https://source.unsplash.com/600x400/?wellness,work"
            alt="Employee Benefits"
            className="rounded-lg shadow-lg"
          />
        </div>
        <div>
          <h2 className="text-3xl font-semibold text-gray-900">Employee Benefits</h2>
          <p className="mt-4 text-gray-700">
            We provide comprehensive benefits including health insurance, professional development programs, and wellness initiatives.
          </p>
        </div>
      </div>

      {/* Testimonials */}
      <div className="mt-16 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-semibold text-gray-900">What Our Employees Say</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <p className="text-gray-700 italic">"This company has provided me with incredible growth opportunities!"</p>
            <p className="mt-4 font-semibold text-gray-900">- John Doe, Developer</p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <p className="text-gray-700 italic">"A fantastic work environment with amazing colleagues!"</p>
            <p className="mt-4 font-semibold text-gray-900">- Jane Smith, Marketing</p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <p className="text-gray-700 italic">"The work-life balance here is the best I've ever had!"</p>
            <p className="mt-4 font-semibold text-gray-900">- Alex Johnson, HR</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LifeAtCompany;
