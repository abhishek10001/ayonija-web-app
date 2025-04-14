const mongoose = require('mongoose');

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
  quantity: { 
    type: String, 
    default: '1 item' 
  }
});

module.exports = mongoose.model('Product', productSchema); 