import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  category: { 
    type: String, 
    required: true 
  },
  imageUrl: { 
    type: String, 
    default: '/default-product.jpg' 
  },
  inStock: { 
    type: Boolean, 
    default: true 
  },
  dosage: { 
    type: String, 
    default: '' 
  },
  precautions: { 
    type: String, 
    default: '' 
  },
  featured: { 
    type: Boolean, 
    default: false 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Product', productSchema); 