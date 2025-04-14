import React from 'react';

const Team = () => {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-neutral-dark">Our Team</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-primary-std">Leadership Team</h2>
            <p className="text-neutral-std">Meet our experienced leadership team driving innovation and excellence in healthcare.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-primary-std">Research & Development</h2>
            <p className="text-neutral-std">Our dedicated team of scientists and researchers working on breakthrough solutions.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-primary-std">Quality Assurance</h2>
            <p className="text-neutral-std">Ensuring the highest standards of quality and safety in all our products.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team; 