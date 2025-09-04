const Booking = require('../models/Booking');

exports.getAll = async (req, res) => {
  const bookings = await Booking.find().populate('property tenant');
  res.json(bookings);
};

exports.create = async (req, res) => {
  const booking = await Booking.create({ ...req.body, tenant: req.user.id });
  res.status(201).json(booking);
};

exports.update = async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(booking);
};

exports.delete = async (req, res) => {
  await Booking.findByIdAndDelete(req.params.id);
  res.json({ message: 'Booking deleted' });
};
