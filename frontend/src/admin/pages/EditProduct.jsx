import React, { useState, useEffect, useContext, useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';
import { toast } from 'react-toastify';
import { FiSave, FiX } from 'react-icons/fi';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProduct, updateProduct, uploadImage, loading } = useContext(AdminContext);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    stock: 0,
    dosage: '',
    precautions: '',
    featured: false
  });

  const fetchProduct = useCallback(async () => {
    if (!isInitialLoad) return;
    
    try {
      const product = await getProduct(id);
      if (product) {
        setFormData({
          name: product.name || '',
          description: product.description || '',
          price: product.price || '',
          image: product.image || '',
          category: product.category || '',
          stock: product.stock || 0,
          dosage: product.dosage || '',
          precautions: product.precautions || '',
          featured: product.featured || false
        });
        setImagePreview(product.image || null);
      }
    } catch (error) {
      setError('Failed to load product');
      toast.error('Failed to load product');
    } finally {
      setIsInitialLoad(false);
    }
  }, [id, getProduct, isInitialLoad]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }, []);

  const handleImageChange = useCallback((e) => {
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
  }, []);

  const validateForm = useCallback(() => {
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
    return true;
  }, [formData]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    try {
      setSaving(true);
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

      const success = await updateProduct(id, productData);

      if (success) {
        toast.success('Product updated successfully');
        navigate('/admin/products');
      } else {
        throw new Error('Failed to update product');
      }
    } catch (err) {
      setError(err.message || 'Failed to update product');
      toast.error(err.message || 'Failed to update product');
      console.error('Error updating product:', err);
    } finally {
      setSaving(false);
    }
  }, [formData, imageFile, id, navigate, updateProduct, uploadImage, validateForm]);

  const isLoading = useMemo(() => loading && isInitialLoad, [loading, isInitialLoad]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-std"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-neutral-dark">Edit Product</h1>
          <p className="text-neutral-std mt-1">Update product information</p>
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
              Stock
            </label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              min="0"
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
            disabled={saving || loading}
            className="px-4 py-2 bg-primary-std text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 flex items-center"
          >
            <FiSave className="mr-2" />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct; 