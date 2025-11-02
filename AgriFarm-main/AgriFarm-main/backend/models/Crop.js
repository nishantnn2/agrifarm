import mongoose from 'mongoose';

const cropSchema = new mongoose.Schema({
  farmerName: {
    type: String,
    required: [true, 'Please provide farmer name'],
    trim: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user ID'],
  },
  crop: {
    type: String,
    required: [true, 'Please provide crop name'],
    trim: true,
  },
  quantity: {
    type: Number,
    required: [true, 'Please provide quantity'],
    min: [0, 'Quantity must be positive'],
  },
  location: {
    type: String,
    required: [true, 'Please provide location'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Please provide price'],
    min: [0, 'Price must be positive'],
  },
  images: [{
    type: String,
  }],
  description: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    enum: ['grain', 'vegetable', 'fruit', 'spice', 'other'],
    default: 'other',
  },
  available: {
    type: Boolean,
    default: true,
  },
  unit: {
    type: String,
    default: 'kg',
  },
}, {
  timestamps: true,
});

const Crop = mongoose.model('Crop', cropSchema);

export default Crop;

