import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSave, FiX, FiUpload } from 'react-icons/fi';

const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    imageUrl: '/default-product.jpg',
    inStock: true,
    dosage: '',
    precautions: '',
    featured: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          imageUrl: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to save the product
    console.log('Product data:', formData);
    alert('Product added successfully!');
    navigate('/admin/products');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-neutral-dark">Add New Product</h1>
        <button
          onClick={() => navigate('/admin/products')}
          className="flex items-center text-neutral-std hover:text-neutral-dark"
        >
          <FiX className="mr-1" />
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Name */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-neutral-std mb-2">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-std"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-neutral-std mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-std"
              required
            >
              <option value="">Select category</option>
              <option value="Immune Support">Immune Support</option>
              <option value="Digestive Health">Digestive Health</option>
              <option value="Heart Health">Heart Health</option>
              <option value="Brain Health">Brain Health</option>
              <option value="Joint Support">Joint Support</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-neutral-std mb-2">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              step="0.01"
              min="0"
              className="w-full px-4 py-2 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-std"
              required
            />
          </div>

          {/* Dosage */}
          <div>
            <label className="block text-sm font-medium text-neutral-std mb-2">
              Dosage
            </label>
            <input
              type="text"
              name="dosage"
              value={formData.dosage}
              onChange={handleInputChange}
              placeholder="e.g., Take 1-2 tablets daily with food"
              className="w-full px-4 py-2 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-std"
            />
          </div>

          {/* In Stock */}
          <div>
            <label className="block text-sm font-medium text-neutral-std mb-2">
              Stock Status
            </label>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="inStock"
                checked={formData.inStock}
                onChange={handleInputChange}
                className="h-4 w-4 text-primary-std focus:ring-primary-std border-neutral-light rounded"
              />
              <span className="ml-2 text-sm text-neutral-std">In Stock</span>
            </div>
          </div>

          {/* Featured */}
          <div>
            <label className="block text-sm font-medium text-neutral-std mb-2">
              Featured Product
            </label>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleInputChange}
                className="h-4 w-4 text-primary-std focus:ring-primary-std border-neutral-light rounded"
              />
              <span className="ml-2 text-sm text-neutral-std">Mark as Featured</span>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div>
          <label className="block text-sm font-medium text-neutral-std mb-2">
            Product Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-2 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-std"
            required
          />
        </div>

        {/* Precautions */}
        <div>
          <label className="block text-sm font-medium text-neutral-std mb-2">
            Precautions
          </label>
          <textarea
            name="precautions"
            value={formData.precautions}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-2 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-std"
            placeholder="Enter any precautions or warnings for this product"
          />
        </div>

        {/* Product Image */}
        <div>
          <label className="block text-sm font-medium text-neutral-std mb-2">
            Product Image
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-light border-dashed rounded-lg">
            <div className="space-y-1 text-center">
              {formData.imageUrl !== '/default-product.jpg' ? (
                <div className="relative">
                  <img
                    src={formData.imageUrl}
                    alt="Product preview"
                    className="max-h-48 mx-auto rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, imageUrl: '/default-product.jpg' }))}
                    className="absolute top-2 right-2 bg-white/80 rounded-full p-1 hover:bg-white"
                  >
                    <FiX className="text-neutral-std" />
                  </button>
                </div>
              ) : (
                <>
                  <FiUpload className="mx-auto h-12 w-12 text-neutral-std" />
                  <div className="flex text-sm text-neutral-std">
                    <label
                      htmlFor="image-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-primary-std hover:text-primary-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-std"
                    >
                      <span>Upload an image</span>
                      <input
                        id="image-upload"
                        name="image"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-neutral-std">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="px-4 py-2 text-sm font-medium text-neutral-std hover:text-neutral-dark border border-neutral-light rounded-lg hover:bg-neutral-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-primary-std rounded-lg hover:bg-primary-dark flex items-center"
          >
            <FiSave className="mr-2" />
            Save Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct; 