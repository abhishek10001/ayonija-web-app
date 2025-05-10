import express from 'express';
import { verifyAdmin } from '../middlewares/auth.js';
import Product from '../models/Product.js';

const router = express.Router();

// Debug middleware for product routes
router.use((req, res, next) => {
  console.log(`Product route accessed: ${req.method} ${req.url}`);
  next();
});

// Get all products
router.get('/', async (req, res) => {
  console.log('Getting all products');
  try {
    const products = await Product.find();
    console.log(`Found ${products.length} products`);
    res.json({ success: true, data: products });
  } catch (error) {
    console.error('Error getting products:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  console.log(`Getting product with id: ${req.params.id}`);
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      console.log('Product not found');
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    console.log('Product found:', product.name);
    res.json({ success: true, data: product });
  } catch (error) {
    console.error('Error getting product:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create product (admin only)
router.post('/', verifyAdmin, async (req, res) => {
  console.log('Creating new product:', req.body);
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    console.log('Product created:', savedProduct.name);
    res.status(201).json({ success: true, data: savedProduct });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(400).json({ success: false, message: error.message });
  }
});

// Update product (admin only)
router.put('/:id', verifyAdmin, async (req, res) => {
  console.log(`Updating product with id: ${req.params.id}`);
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) {
      console.log('Product not found for update');
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    console.log('Product updated:', product.name);
    res.json({ success: true, data: product });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(400).json({ success: false, message: error.message });
  }
});

// Delete product (admin only)
router.delete('/:id', verifyAdmin, async (req, res) => {
  console.log(`Deleting product with id: ${req.params.id}`);
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      console.log('Product not found for deletion');
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    console.log('Product deleted:', product.name);
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router; 