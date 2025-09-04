const mongoose = require('mongoose');

const furnitureOrderSchema = new mongoose.Schema({
  property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' },
  items: [{ name: String, quantity: Number }],
  status: { type: String, enum: ['pending', 'delivered'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('FurnitureOrder', furnitureOrderSchema);
