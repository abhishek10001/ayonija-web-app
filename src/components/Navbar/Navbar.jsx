// import React, { useState } from 'react';

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <nav className="bg-white shadow-md">
//       <div className="max-w-6xl mx-auto px-4">
//         <div className="flex justify-between items-center h-16">
//           <div className="flex-shrink-0">
//             <a href="/" className="text-xl font-bold text-gray-800">
//               YourLogo
//             </a>
//           </div>
//           <div className="hidden md:flex space-x-4">
//             <a href="/about" className="text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">
//               ABOUT US
//             </a>
//             <a href="/products" className="text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">
//               PRODUCTS
//             </a>
//             <a href="/infrastructure" className="text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">
//               INFRASTRUCTURE
//             </a>
//             <a href="/careers" className="text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">
//               CAREERS
//             </a>
//             <a href="/blog" className="text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">
//               BLOG
//             </a>
//             <a href="/contact" className="text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">
//               CONTACT US
//             </a>
//           </div>
//           <div className="md:hidden flex items-center">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               type="button"
//               className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-blue-500 focus:outline-none"
//             >
//               <svg
//                 className="h-6 w-6"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 aria-hidden="true"
//               >
//                 {isOpen ? (
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 ) : (
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M4 6h16M4 12h16m-7 6h7"
//                   />
//                 )}
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="md:hidden">
//           <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//             <a href="/about" className="block text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-base font-medium">
//               ABOUT US
//             </a>
//             <a href="/products" className="block text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-base font-medium">
//               PRODUCTS
//             </a>
//             <a href="/infrastructure" className="block text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-base font-medium">
//               INFRASTRUCTURE
//             </a>
//             <a href="/careers" className="block text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-base font-medium">
//               CAREERS
//             </a>
//             <a href="/blog" className="block text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-base font-medium">
//               BLOG
//             </a>
//             <a href="/contact" className="block text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-base font-medium">
//               CONTACT US
//             </a>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;



















// new code 

















import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  const navItems = [
    { id: 1, label: 'ABOUT US', link: '/about-us' },
    { id: 2, label: 'PRODUCTS', link: '/products' },
    { id: 3, label: 'INFRASTRUCTURE', link: '/infrastructure' },
    { id: 4, label: 'CAREERS',
        subItems: [
            { label: 'Life at Facebook', link: '/life-at-company '},
            { label: 'Jobs', link: '/jobs' },
          ]
    },
    { id: 5, label: 'BLOG', link: '/blog' },
    { id: 6, label: 'CONTACT US', link: '/contact-us' },
    {
      id: 7,
      label: 'QUALITY',
      subItems: [
        { label: 'Manufacturing', link: '/manufacturing' },
        { label: 'Research and Development', link: '/research' },
      ],
    },
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="text-white text-2xl font-bold">
              YourLogo
            </a>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <div key={item.id} className="relative">
                {item.subItems ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(item.id)}
                      className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                    >
                      {item.label}
                      <svg
                        className="ml-1 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    {dropdownOpen === item.id && (
                      <div className="absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div className="py-1">
                          {item.subItems.map((subItem) => (
                            <a
                              key={subItem.label}
                              href={subItem.link}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                            >
                              {subItem.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={item.link}
                    className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {item.label}
                  </a>
                )}
              </div>
            ))}
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-blue-200 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <div key={item.id}>
                {item.subItems ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(item.id)}
                      className="w-full text-left text-white hover:bg-blue-600 px-3 py-2 rounded-md text-base font-medium flex items-center justify-between"
                    >
                      {item.label}
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    {dropdownOpen === item.id && (
                      <div className="pl-4">
                        {item.subItems.map((subItem) => (
                          <a
                            key={subItem.label}
                            href={subItem.link}
                            className="block px-3 py-2 text-base text-white hover:bg-blue-600 rounded-md"
                          >
                            {subItem.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={item.link}
                    className="block text-white hover:bg-blue-600 px-3 py-2 rounded-md text-base font-medium"
                  >
                    {item.label}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;