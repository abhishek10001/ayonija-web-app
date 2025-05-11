import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiSearch, 
  FiEdit2, 
  FiTrash2, 
  FiPlus,
  FiFilter,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi';
import { AdminContext } from '../context/AdminContext';

const Products = () => {
  const { products, loading, getAllProducts, deleteProduct } = useContext(AdminContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [error, setError] = useState(null);

  const categories = ['all', 'OTC', 'Supplements', 'Prescription'];

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const success = await deleteProduct(id);
        if (success) {
          // Product list will be automatically refreshed by the context
        }
      } catch (error) {
        setError('Failed to delete product');
      }
    }
  };

  const filteredProducts = products.filter(product => 
    (selectedCategory === 'all' || product.category === selectedCategory) &&
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-std"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-alert-error p-4">
        {error}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-neutral-dark">Products</h1>
          <p className="text-neutral-std mt-1">Manage your product inventory</p>
        </div>
        <Link
          to="/admin/products/add"
          className="inline-flex items-center px-4 py-2 bg-primary-std text-white rounded-lg hover:bg-primary-dark transition-colors duration-300"
        >
          <FiPlus className="mr-2" size={20} />
          Add Product
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-std" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-neutral-light rounded-lg focus:ring-2 focus:ring-primary-std focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-2">
            <FiFilter className="text-neutral-std" size={20} />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-neutral-light rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-std focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-std uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-std uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-std uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-std uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-std uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-neutral-std uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-light">
              {filteredProducts.map((product) => (
                <tr key={product._id} className="hover:bg-neutral-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-neutral-dark">{product.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-neutral-std">{product.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-neutral-std">{product.stock}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-neutral-std">${product.price}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      product.stock > 0 
                        ? 'bg-alert-success/10 text-alert-success' 
                        : 'bg-alert-error/10 text-alert-error'
                    }`}>
                      {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link to={`/admin/products/edit/${product._id}`} className="text-primary-std hover:text-primary-dark mr-3">
                      <FiEdit2 size={18} />
                    </Link>
                    <button 
                      onClick={() => handleDelete(product._id)}
                      className="text-alert-error hover:text-alert-error/80"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 flex items-center justify-between border-t border-neutral-light">
          <div className="text-sm text-neutral-std">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredProducts.length}</span> of{' '}
            <span className="font-medium">{filteredProducts.length}</span> results
          </div>
          <div className="flex items-center space-x-2">
            <button
              className="p-2 rounded-lg hover:bg-neutral-light transition-colors duration-200"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <FiChevronLeft size={20} />
            </button>
            <button
              className="p-2 rounded-lg hover:bg-neutral-light transition-colors duration-200"
              onClick={() => setCurrentPage(prev => prev + 1)}
            >
              <FiChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products; 