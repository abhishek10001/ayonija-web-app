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
  try {
    const products = await Product.find();
    res.json({ 
      success: true, 
      data: { products } 
    });
  } catch (error) {
    console.error('Error getting products:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: 'Product not found' 
      });
    }
    res.json({ 
      success: true, 
      data: product 
    });
  } catch (error) {
    console.error('Error getting product:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// Create product (admin only)
router.post('/addproducts', verifyAdmin, async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json({ 
      success: true, 
      data: savedProduct 
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// Update product (admin only)
router.put('/addproducts/:id', verifyAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: 'Product not found' 
      });
    }
    res.json({ 
      success: true, 
      data: product 
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// Delete product (admin only)
router.delete('/addproducts/:id', verifyAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: 'Product not found' 
      });
    }
    res.json({ 
      success: true, 
      message: 'Product deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

export default router; 