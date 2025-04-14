const products = [
  {
    name: "Paracetamol 500mg",
    description: "Fast-acting pain relief and fever reducer. Suitable for adults and children over 12 years.",
    price: 5.99,
    category: "Pain Relief",
      imageUrl: "https://cdn.pixabay.com/photo/2017/02/28/14/56/omeprazole-2104830_1280.jpg",
    inStock: true,
    dosage: "1-2 tablets every 4-6 hours as needed",
    precautions: "Do not exceed 8 tablets in 24 hours. Not suitable for people with liver problems.",
    featured: true,
    quantity: 100
  },
  {
    name: "Vitamin C 1000mg",
    description: "High-strength vitamin C supplement with extended release formula for better absorption.",
    price: 12.99,
    category: "Vitamins & Supplements",
    imageUrl: "https://cdn.pixabay.com/photo/2017/02/28/14/56/omeprazole-2104830_1280.jpg",
    inStock: true,
    dosage: "1 tablet daily with food",
    precautions: "Consult doctor if pregnant or breastfeeding",
    featured: true,
    quantity: 75
  },
  {
    name: "Omeprazole 20mg",
    description: "Proton pump inhibitor for acid reflux and heartburn relief.",
    price: 15.99,
    category: "Digestive Health",
    imageUrl: "https://cdn.pixabay.com/photo/2017/02/28/14/56/omeprazole-2104830_1280.jpg",
    inStock: true,
    dosage: "1 capsule daily before breakfast",
    precautions: "Not recommended for long-term use without medical supervision",
    featured: false,
    quantity: 50
  },
  {
    name: "Cetirizine 10mg",
    description: "Non-drowsy antihistamine for allergy relief.",
    price: 8.99,
    category: "Allergy",
    imageUrl: "https://cdn.pixabay.com/photo/2017/02/28/14/56/omeprazole-2104830_1280.jpg",
    inStock: true,
    dosage: "1 tablet daily",
    precautions: "May cause drowsiness in some individuals",
    featured: true,
    quantity: 120
  }
];

const jobs = [
  {
    title: "Clinical Pharmacist",
    description: "Seeking an experienced clinical pharmacist to join our team. Responsibilities include medication management, patient counseling, and ensuring proper drug therapy.",
    requirements: "Doctor of Pharmacy (PharmD) degree, valid state license, 2+ years of clinical experience",
    location: "New York, NY",
    salary: "$120,000 - $150,000 per year",
    type: "Full-time",
    deadline: new Date("2024-06-30"),
    isActive: true
  },
  {
    title: "Pharmaceutical Research Scientist",
    description: "Join our research team to develop new pharmaceutical formulations and conduct clinical trials.",
    requirements: "PhD in Pharmaceutical Sciences or related field, 3+ years of research experience",
    location: "Boston, MA",
    salary: "$90,000 - $130,000 per year",
    type: "Full-time",
    deadline: new Date("2024-07-15"),
    isActive: true
  },
  {
    title: "Pharmacy Technician",
    description: "Support our pharmacy operations by assisting pharmacists in preparing and dispensing medications.",
    requirements: "High school diploma, pharmacy technician certification, 1+ year of experience",
    location: "Chicago, IL",
    salary: "$35,000 - $45,000 per year",
    type: "Full-time",
    deadline: new Date("2024-06-15"),
    isActive: true
  }
];

module.exports = { products, jobs }; 