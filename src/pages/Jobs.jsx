import React from "react";

const Jobs = () => {
  return (
    <div className="bg-gray-50 py-16 px-6 md:px-16 lg:px-24">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl font-extrabold text-gray-900">Join Our Team</h1>
        <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
          Explore exciting career opportunities with us and be a part of
          something great.
        </p>
      </div>

      {/* Job Listings Section */}
      <div className="mt-16 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white shadow-xl rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900">Available Positions</h2>
          <ul className="mt-4 space-y-4">
            <li className="border p-4 rounded-lg shadow-sm hover:shadow-md transition">
              <h3 className="text-lg font-bold">Quality Assurance Specialist</h3>
              <p className="text-gray-600">New York, NY | Full-Time</p>
              <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Apply Now
              </button>
            </li>
            <li className="border p-4 rounded-lg shadow-sm hover:shadow-md transition">
              <h3 className="text-lg font-bold">Production Supervisor</h3>
              <p className="text-gray-600">Los Angeles, CA | Full-Time</p>
              <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Apply Now
              </button>
            </li>
          </ul>
        </div>

        {/* Job Application Form */}
        <div className="bg-white shadow-xl rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900">Apply for a Job</h2>
          <form className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Name" className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none" />
              <input type="text" placeholder="Total Experience" className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none" />
              <input type="email" placeholder="Email" className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none" />
              <input type="text" placeholder="Phone" className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none" />
            </div>
            <input type="file" className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none" />
            <select className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none">
              <option>Select Position</option>
              <option>Quality Assurance Specialist</option>
              <option>Production Supervisor</option>
            </select>
            <textarea placeholder="More Details" className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none h-32"></textarea>
            <button type="submit" className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition duration-300 shadow-md">
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
