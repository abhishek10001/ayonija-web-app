import React, { useState } from "react";
import { jsPDF } from "jspdf";

const Products = () => {
  const logoUrl = "https://via.placeholder.com/150"; // Replace with actual logo URL
  const companyName = "Ayojina";

  const categories = [
    { id: "tablets", name: "Pharmaceutical Tablets" },
    { id: "nutraceuticals", name: "Nutraceuticals" },
    { id: "api", name: "API & Intermediates" },
    { id: "herbal", name: "Herbal Medicines" },
    { id: "injectables", name: "Injectables" },
    { id: "ointments", name: "Ointments & Gels" },
  ];

  const products = {
    tablets: [
      { id: 1, name: "Paracetamol", description: "Pain reliever tablet." },
      { id: 2, name: "Ibuprofen", description: "Anti-inflammatory tablet." },
    ],
    nutraceuticals: [
      { id: 3, name: "Vitamin D3", description: "Boosts bone health." },
      { id: 4, name: "Omega 3", description: "Supports heart health." },
    ],
    api: [{ id: 5, name: "Metformin", description: "Controls blood sugar levels." }],
    herbal: [{ id: 6, name: "Ashwagandha", description: "Supports stress relief." }],
    injectables: [{ id: 7, name: "Insulin", description: "Used for diabetes management." }],
    ointments: [{ id: 8, name: "Hydrocortisone Cream", description: "Reduces skin inflammation." }],
  };

  const [selectedCategory, setSelectedCategory] = useState("tablets");

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.addImage(logoUrl, "JPEG", 20, 10, 40, 20);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text(companyName, 70, 20);

    doc.setFontSize(16);
    doc.text(categories.find(cat => cat.id === selectedCategory)?.name, 20, 40);

    doc.setFontSize(12);
    let yOffset = 60;
    products[selectedCategory].forEach((product, index) => {
      doc.text(`${index + 1}. ${product.name} - ${product.description}`, 20, yOffset);
      yOffset += 10;
    });

    doc.save(`${selectedCategory}-brochure.pdf`);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="h-64 bg-gray-300 flex items-center justify-center text-3xl font-bold text-gray-700">
        Product Page Banner
      </div>

      <div className="container mx-auto py-6 px-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Select a Category</h2>
        <div className="flex justify-center space-x-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg font-semibold transition duration-300 ${
                selectedCategory === category.id ? "bg-blue-600 text-white" : "bg-white text-gray-800 border"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto py-6 px-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          {categories.find((cat) => cat.id === selectedCategory)?.name}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {products[selectedCategory].map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300 p-6"
            >
              <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
              <p className="text-gray-600 mt-2">{product.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={generatePDF}
            className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-700"
          >
            Download {categories.find((cat) => cat.id === selectedCategory)?.name} Brochure
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;
