const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  address: String,
  location: String,
  price: Number,
  bedrooms: { type: Number, default: 1 },
  bathrooms: { type: Number, default: 1 },
  area: { type: Number, default: 0 },
  images: { type: [String], default: [] },
  propertyType: { type: String, default: 'apartment' },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['pending', 'verified'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Property', propertySchema);
