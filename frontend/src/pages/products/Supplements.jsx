import React from 'react';

const Supplements = () => {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-neutral-dark">Supplements</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-primary-std">Vitamins & Minerals</h2>
            <p className="text-neutral-std">Essential nutrients to support overall health and wellness.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-primary-std">Herbal Supplements</h2>
            <p className="text-neutral-std">Natural remedies and traditional medicine solutions.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-primary-std">Sports Nutrition</h2>
            <p className="text-neutral-std">Performance-enhancing supplements for athletes.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Supplements; 