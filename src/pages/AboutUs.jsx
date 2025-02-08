// import React from "react";

// const AboutUs = () => {
//   return (
//     <div className="bg-gray-100 py-16 px-6 md:px-16 lg:px-24">
//       {/* Hero Section */}
//       <div className="max-w-6xl mx-auto text-center">
//         <h1 className="text-4xl font-bold text-gray-800">About Us</h1>
//         <p className="mt-4 text-lg text-gray-600">
//           Delivering world-class pharmaceutical solutions with innovation and integrity.
//         </p>
//       </div>

//       {/* About Content */}
//       <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
//         <div>
//           <img
//             src="https://source.unsplash.com/600x400/?healthcare,science"
//             alt="About Us"
//             className="rounded-lg shadow-lg w-full"
//           />
//         </div>
//         <div>
//           <h2 className="text-2xl font-semibold text-gray-800">Our Vision & Mission</h2>
//           <p className="mt-4 text-gray-600">
//             We strive to be at the forefront of pharmaceutical advancements, ensuring
//             affordable and effective healthcare solutions for people worldwide.
//           </p>
//           <p className="mt-4 text-gray-600">
//             Through continuous innovation and research, we commit to improving lives
//             with high-quality, safe, and sustainable healthcare products.
//           </p>
//         </div>
//       </div>

//       {/* Core Values Section */}
//       <div className="mt-16 bg-white shadow-lg rounded-lg p-8 max-w-6xl mx-auto text-center">
//         <h2 className="text-2xl font-semibold text-gray-800">Our Core Values</h2>
//         <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="p-4 border rounded-lg hover:shadow-md">
//             <h3 className="text-xl font-medium text-gray-700">Innovation</h3>
//             <p className="mt-2 text-gray-500">Constantly pushing the boundaries in pharmaceutical research.</p>
//           </div>
//           <div className="p-4 border rounded-lg hover:shadow-md">
//             <h3 className="text-xl font-medium text-gray-700">Integrity</h3>
//             <p className="mt-2 text-gray-500">Maintaining ethical and transparent business practices.</p>
//           </div>
//           <div className="p-4 border rounded-lg hover:shadow-md">
//             <h3 className="text-xl font-medium text-gray-700">Quality</h3>
//             <p className="mt-2 text-gray-500">Delivering safe and effective healthcare solutions.</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AboutUs;










// new 
























import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-gray-100 py-16 px-6 md:px-16 lg:px-24">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl font-extrabold text-gray-800">About Us</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          Delivering world-class pharmaceutical solutions with innovation and integrity.
        </p>
      </div>

      {/* Company Overview */}
      <div className="mt-16 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800">Company Overview</h2>
        <p className="mt-4 text-gray-600 max-w-4xl mx-auto">
          Our company is dedicated to advancing healthcare solutions through cutting-edge 
          research and development. With a global presence and a commitment to excellence, 
          we are focused on providing affordable and effective medical solutions.
        </p>
      </div>

      {/* Vision & Mission */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
        <div>
          <img
            src="https://source.unsplash.com/600x400/?healthcare,science"
            alt="Our Vision"
            className="rounded-lg shadow-lg w-full"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Our Vision & Mission</h2>
          <p className="mt-4 text-gray-600">
            We strive to be at the forefront of pharmaceutical advancements, ensuring
            affordable and effective healthcare solutions for people worldwide.
          </p>
          <p className="mt-4 text-gray-600">
            Through continuous innovation and research, we commit to improving lives
            with high-quality, safe, and sustainable healthcare products.
          </p>
        </div>
      </div>

      {/* Leadership Team */}
      <div className="mt-16 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800">Our Leadership Team</h2>
        <p className="mt-4 text-gray-600 max-w-4xl mx-auto">
          Meet the dedicated leaders driving our mission forward with passion and expertise.
        </p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <img
              src="https://source.unsplash.com/200x200/?man,executive"
              alt="CEO"
              className="rounded-full w-32 h-32 mx-auto"
            />
            <h3 className="mt-4 text-xl font-semibold text-gray-800">John Doe</h3>
            <p className="text-gray-600">Chief Executive Officer</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <img
              src="https://source.unsplash.com/200x200/?woman,executive"
              alt="COO"
              className="rounded-full w-32 h-32 mx-auto"
            />
            <h3 className="mt-4 text-xl font-semibold text-gray-800">Jane Smith</h3>
            <p className="text-gray-600">Chief Operating Officer</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <img
              src="https://source.unsplash.com/200x200/?man,leader"
              alt="CTO"
              className="rounded-full w-32 h-32 mx-auto"
            />
            <h3 className="mt-4 text-xl font-semibold text-gray-800">Michael Johnson</h3>
            <p className="text-gray-600">Chief Technology Officer</p>
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="mt-16 bg-white shadow-lg rounded-lg p-8 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800">Our Core Values</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 border rounded-lg hover:shadow-md">
            <h3 className="text-xl font-medium text-gray-700">Innovation</h3>
            <p className="mt-2 text-gray-500">Constantly pushing the boundaries in pharmaceutical research.</p>
          </div>
          <div className="p-6 border rounded-lg hover:shadow-md">
            <h3 className="text-xl font-medium text-gray-700">Integrity</h3>
            <p className="mt-2 text-gray-500">Maintaining ethical and transparent business practices.</p>
          </div>
          <div className="p-6 border rounded-lg hover:shadow-md">
            <h3 className="text-xl font-medium text-gray-700">Quality</h3>
            <p className="mt-2 text-gray-500">Delivering safe and effective healthcare solutions.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
