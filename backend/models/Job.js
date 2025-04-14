const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  requirements: { 
    type: String, 
    required: true 
  },
  location: { 
    type: String, 
    required: true 
  },
  salary: { 
    type: String, 
    required: true 
  },
  type: { 
    type: String, 
    required: true 
  },
  postedAt: { 
    type: Date, 
    default: Date.now 
  },
  deadline: { 
    type: Date, 
    required: true 
  },
  isActive: { 
    type: Boolean, 
    default: true 
  }
});

module.exports = mongoose.model('Job', jobSchema); 