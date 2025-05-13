import React, { useState, useEffect, useContext } from "react";
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
import HeroAllProducts from '../components/HeroAllProduct';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All products");
  const [sortBy, setSortBy] = useState("Featured");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getProducts } = useContext(UserContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const productsData = await getProducts();
        setProducts(productsData);
        setError(null);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-b from-neutral-light/30 to-white pt-8">
          <HeroAllProducts />
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-std mx-auto"></div>
              <p className="mt-4 text-neutral-std">Loading products...</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-b from-neutral-light/30 to-white pt-8">
          <HeroAllProducts />
          <div className="container mx-auto px-4 py-8">
            <div className="text-center text-red-500">
              <p>{error}</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (products.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-b from-neutral-light/30 to-white pt-8">
          <HeroAllProducts />
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <p className="text-neutral-std">No products available at the moment.</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-neutral-light/30 to-white pt-8">
        <HeroAllProducts />
        <div className="container mx-auto px-4 py-8">
          {/* Search and Filter Section */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 top-4 z-10 rounded-xl p-2">
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
            <div className="relative border-primary-dark min-w-[200px]">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full appearance-none pl-4 pr-10 py-2.5 rounded-lg border-2 border-primary-dark focus:border-primary-std focus:ring-2 focus:ring-primary-std/20 outline-none transition-all bg-white"
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
            <div className="relative border-2 border-primary-dark rounded-lg min-w-[200px]">
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
                key={product._id}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-neutral-light hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
              >
                {/* Product Image */}
                <div className="relative">
                  <img
                    src={product.image || 'https://placehold.co/400x400?text=No+Image'}
                    alt={product.name}
                    className="w-full h-40 object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://placehold.co/400x400?text=No+Image';
                    }}
                  />
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-1 text-xs font-semibold text-white rounded-full bg-primary-std flex items-center">
                      <Star className="mr-1" size={12} />
                      {product.category}
                    </span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-lg font-semibold text-neutral-dark line-clamp-1">{product.name}</h3>
                  <p className="mt-1 text-neutral-std text-sm line-clamp-2 min-h-[48px]">{product.description}</p>

                  <div className="mt-3 bg-neutral-50 rounded-lg p-3 text-xs">
                    <div className="flex justify-between mb-1.5">
                      <span className="font-medium text-neutral-std">Price:</span>
                      <span className="font-semibold text-neutral-dark">${product.price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-neutral-std">Stock:</span>
                      <span className="text-right max-w-[70%] font-semibold text-neutral-dark">{product.stock} {product.stock === 1 ? 'unit' : 'units'}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-center mt-auto">
                    <Link
                      to={`/products/${product._id}`}
                      className="inline-flex items-center justify-center px-4 py-2 bg-primary-std text-white rounded-md hover:bg-primary-dark transition-all duration-300 text-sm font-medium shadow-sm hover:shadow-md"
                    >
                      <Info className="mr-1.5" size={14} />
                      <span>View Details</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />      
    </>
  );
};

export default AllProducts;
