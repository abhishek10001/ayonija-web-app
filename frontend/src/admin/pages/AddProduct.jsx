import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';
import { toast } from 'react-toastify';
import { FiSave, FiX } from 'react-icons/fi';

const AddProduct = () => {
  const navigate = useNavigate();
  const { createProduct, uploadImage, loading } = useContext(AdminContext);
  const [error, setError] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    inStock: true,
    dosage: '',
    precautions: '',
    featured: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }
      setImageFile(file);
      setError(null);
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Product name is required');
      return false;
    }
    if (!formData.category) {
      setError('Category is required');
      return false;
    }
    if (!formData.price || formData.price <= 0) {
      setError('Please enter a valid price');
      return false;
    }
    if (!formData.description.trim()) {
      setError('Description is required');
      return false;
    }
    if (!imageFile && !formData.image) {
      setError('Product image is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    try {
      let imageUrl = formData.image;

      // If there's a new image file, upload it to Cloudinary
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
        if (!imageUrl) {
          throw new Error('Failed to upload image');
        }
      }

      const productData = {
        ...formData,
        image: imageUrl,
        price: parseFloat(formData.price)
      };

      const success = await createProduct(productData);

      if (success) {
        toast.success('Product created successfully');
        navigate('/admin/products');
      } else {
        throw new Error('Failed to create product');
      }
    } catch (err) {
      setError(err.message || 'Failed to create product');
      toast.error(err.message || 'Failed to create product');
      console.error('Error creating product:', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-neutral-dark">Add New Product</h1>
          <p className="text-neutral-std mt-1">Create a new product in your inventory</p>
        </div>
        <button
          onClick={() => navigate('/admin/products')}
          className="flex items-center text-neutral-std hover:text-neutral-dark"
        >
          <FiX className="mr-1" />
          Cancel
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-alert-error/10 text-alert-error rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-neutral-dark mb-2">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-neutral-light rounded-lg focus:ring-2 focus:ring-primary-std focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-dark mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-neutral-light rounded-lg focus:ring-2 focus:ring-primary-std focus:border-transparent"
            >
              <option value="">Select a category</option>
              <option value="OTC">OTC</option>
              <option value="Supplements">Supplements</option>
              <option value="Prescription">Prescription</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-dark mb-2">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="w-full px-4 py-2 border border-neutral-light rounded-lg focus:ring-2 focus:ring-primary-std focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-dark mb-2">
              Product Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border border-neutral-light rounded-lg focus:ring-2 focus:ring-primary-std focus:border-transparent"
            />
            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-32 w-32 object-cover rounded-lg"
                />
              </div>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-neutral-dark mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-4 py-2 border border-neutral-light rounded-lg focus:ring-2 focus:ring-primary-std focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-dark mb-2">
              Dosage
            </label>
            <input
              type="text"
              name="dosage"
              value={formData.dosage}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-neutral-light rounded-lg focus:ring-2 focus:ring-primary-std focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-dark mb-2">
              Precautions
            </label>
            <input
              type="text"
              name="precautions"
              value={formData.precautions}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-neutral-light rounded-lg focus:ring-2 focus:ring-primary-std focus:border-transparent"
            />
          </div>

          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="inStock"
                checked={formData.inStock}
                onChange={handleChange}
                className="rounded border-neutral-light text-primary-std focus:ring-primary-std"
              />
              <span className="ml-2 text-sm text-neutral-dark">In Stock</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="rounded border-neutral-light text-primary-std focus:ring-primary-std"
              />
              <span className="ml-2 text-sm text-neutral-dark">Featured Product</span>
            </label>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="px-4 py-2 border border-neutral-light rounded-lg text-neutral-dark hover:bg-neutral-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-primary-std text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 flex items-center"
          >
            <FiSave className="mr-2" />
            {loading ? 'Creating...' : 'Create Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct; 