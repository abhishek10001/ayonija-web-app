import React, { useState, useMemo, useEffect, useContext } from 'react';
import { FiInfo, FiStar, FiFilter, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const FeaturedProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [visibleProducts, setVisibleProducts] = useState(4);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const PRODUCTS_PER_LOAD = 4;
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
  const categories = useMemo(() => {
    const cats = [...new Set(products.map(product => product.category))];
    return ['all', ...cats];
  }, [products]);

  // Filter products based on category
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') return products;
    return products.filter(product => product.category === selectedCategory);
  }, [selectedCategory, products]);

  // Get currently visible products
  const currentProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleProducts);
  }, [filteredProducts, visibleProducts]);

  const handleShowMore = () => {
    setVisibleProducts(prev => Math.min(prev + PRODUCTS_PER_LOAD, filteredProducts.length));
  };

  const handleShowLess = () => {
    setVisibleProducts(4);
  };

  if (loading) {
    return (
      <section className="mx-auto px-4 md:px-8 lg:px-12 py-16">
        <div className="max-w-[1920px] mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-std mx-auto"></div>
            <p className="mt-4 text-neutral-std">Loading products...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mx-auto px-4 md:px-8 lg:px-12 py-16">
        <div className="max-w-[1920px] mx-auto">
          <div className="text-center text-red-500">
            <p>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="mx-auto px-4 md:px-8 lg:px-12 py-16">
        <div className="max-w-[1920px] mx-auto">
          <div className="text-center">
            <p className="text-neutral-std">No products available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto px-4 md:px-8 lg:px-12 py-16 ">
      <div className="max-w-[1920px] mx-auto">
        <div className="flex flex-col mb-12">
          <div className="mb-8">
            <div className="flex items-center">
              <div className="w-12 h-1 bg-primary-std rounded mr-4"></div>
              <span className="text-primary-std font-medium uppercase tracking-wider text-sm">
                Our Products
              </span>
            </div>
            <h2 className="text-3xl font-bold text-neutral-dark mt-3">
              Featured Products
            </h2>
            <p className="text-neutral-std mt-2 max-w-lg">
              Discover our carefully selected pharmaceutical products
            </p>
          </div>

          {/* Filter Section */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <div className="flex items-center bg-white px-3 py-1.5 rounded-lg shadow-sm">
              <FiFilter className="text-primary-std mr-2" size={14} />
              <span className="text-neutral-std text-sm">Filter by:</span>
            </div>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setVisibleProducts(4); // Reset visible products when changing category
                }}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-primary-std text-white shadow-md'
                    : 'bg-white text-neutral-std hover:bg-secondary-std/10'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {currentProducts.map((product) => (
            <div 
              key={product._id} 
              className="bg-white rounded-lg shadow-md overflow-hidden border border-neutral-light hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
            >
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
                    <FiStar className="mr-1" size={12} />
                    {product.category}
                  </span>
                </div>
              </div>

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

                <div className=" ml-20 mt-auto">
                  <Link
                    to={`/products/${product._id}`}
                    className="inline-flex items-center justify-center px-4 py-2 bg-primary-std text-white rounded-md hover:bg-primary-dark transition-all duration-300 text-sm font-medium shadow-sm hover:shadow-md"
                  >
                    <FiInfo size={14} className="mr-1.5" />
                    <span>View Details</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show More/Less Button */}
        <div className="flex justify-center mt-12">
          {visibleProducts < filteredProducts.length ? (
            <button 
              onClick={handleShowMore}
              className="group flex items-center px-6 py-2.5 bg-white shadow-md rounded-lg border-2 border-primary-std hover:bg-primary-std transition-all duration-300"
            >
              <span className="text-primary-std group-hover:text-white font-medium text-sm">Show More Products</span>
              <FiChevronDown className="ml-2 text-primary-std group-hover:text-white" size={16} />
            </button>
          ) : visibleProducts > 4 && (
            <button 
              onClick={handleShowLess}
              className="group flex items-center px-6 py-2.5 bg-white shadow-md rounded-lg border-2 border-primary-std hover:bg-primary-std transition-all duration-300"
            >
              <span className="text-primary-std group-hover:text-white font-medium text-sm">Show Less</span>
              <FiChevronUp className="ml-2 text-primary-std group-hover:text-white" size={16} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;