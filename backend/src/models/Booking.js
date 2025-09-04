const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' },
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  startDate: Date,
  endDate: Date,
  status: { type: String, enum: ['active', 'cancelled', 'completed'], default: 'active' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);
