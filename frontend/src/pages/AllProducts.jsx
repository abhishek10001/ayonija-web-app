import React, { useState, useEffect } from "react";
import {
  Search,
  ChevronDown,
  Info,
  ChevronLeft,
  ChevronRight,
  Award,
  Users,
  Star,
  Building,
  DollarSign,
} from "lucide-react";
import { initialData } from "../data/initialData";
import HeroAllProducts from '../components/HeroAllProduct';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
const AllProducts = () => {
  const [products, setProducts] = useState(initialData.products || []);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All products");
  const [sortBy, setSortBy] = useState("Featured");

  // Get unique categories from products
  const categories = [
    "All products",
    ...new Set(products.map((product) => product.category)),
  ];

  // Filter products based on search and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All products" ||
      product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort products
  const sortProducts = (products) => {
    switch (sortBy) {
      case "Name: A to Z":
        return [...products].sort((a, b) => a.name.localeCompare(b.name));
      case "Name: Z to A":
        return [...products].sort((a, b) => b.name.localeCompare(a.name));
      default:
        return products;
    }
  };

  const sortedProducts = sortProducts(filteredProducts);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-b from-neutral-light/30 to-white pt-8">
      <HeroAllProducts />
      <div className="container mx-auto px-4 py-8">
       

        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 top-4 z-10   rounded-xl  p-2">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-std" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border-2 border-primary-dark focus:border-primary-std focus:ring-2 focus:ring-primary-std/20 outline-none transition-all"
            />
          </div>

          {/* Category Filter */}
          <div className="relative border-primary-dark  min-w-[200px]">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full appearance-none pl-4 pr-10 py-2.5 rounded-lg border-2 border-primary-dark
               focus:border-primary-std focus:ring-2 focus:ring-primary-std/20 outline-none transition-all bg-white"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-std pointer-events-none" />
          </div>

          {/* Sort */}
          <div className="relative border-2 border-primary-dark rounded-lg  min-w-[200px]">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full appearance-none pl-4 pr-10 py-2.5 rounded-lg border-2 border-neutral-light focus:border-primary-std focus:ring-2 focus:ring-primary-std/20 outline-none transition-all bg-white"
            >
              <option value="Featured">Featured</option>
              <option value="Name: A to Z">Name: A to Z</option>
              <option value="Name: Z to A">Name: Z to A</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-std pointer-events-none" />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all transform hover:scale-105
                ${selectedCategory === category
                  ? "bg-primary-std text-white shadow-md"
                  : "bg-white text-neutral-std hover:bg-neutral-light hover:shadow-sm"
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Product Image */}
              <div className="aspect-square overflow-hidden bg-neutral-light/30 relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-2 right-2 flex flex-col gap-2">
                  {product.inStock && (
                    <span className="bg-green-500/90 text-white text-xs px-2 py-1 rounded-full">
                      In Stock
                    </span>
                  )}
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-white" />
                    <span className="text-white font-bold">
                      {product.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-medium text-primary-std bg-primary-std/10 px-2 py-1 rounded-full">
                    {product.category}
                  </span>
                  <span className="text-xs font-medium text-neutral-std">
                    {product.quantity} units
                  </span>
                </div>
                <h3 className="font-semibold text-neutral-dark mb-2 line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-sm text-neutral-std mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-std bg-neutral-light/50 px-2 py-1 rounded-full">
                    {product.dosage}
                  </span>
                  <button
                    className="bg-primary-std text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-primary-dark transition-all duration-300 flex items-center gap-2 group-hover:shadow-md"
                    onClick={() => {
                      /* Navigate to details page */
                    }}
                  >
                    <Info className="h-4 w-4" />
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {sortedProducts.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <Search className="h-12 w-12 text-neutral-std mx-auto mb-4" />
            <p className="text-neutral-std text-lg">
              No products found matching your criteria.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All products");
                setSortBy("Featured");
              }}
              className="mt-4 text-primary-std hover:text-primary-dark transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
    <Footer />
    </>
  );
};

export default AllProducts;
