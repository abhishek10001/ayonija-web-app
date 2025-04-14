import React from 'react';

const News = () => {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-neutral-dark">Latest News</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-primary-std">Company Updates</h2>
            <p className="text-neutral-std">Stay informed about our latest developments and achievements.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-primary-std">Industry News</h2>
            <p className="text-neutral-std">Latest trends and developments in the pharmaceutical industry.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-primary-std">Research Breakthroughs</h2>
            <p className="text-neutral-std">Discover our latest research findings and innovations.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News; 