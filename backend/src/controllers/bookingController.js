const { bookingService } = require('../services/database');

exports.getAll = async (req, res) => {
  try {
    const bookings = await bookingService.findAll();
    res.json(bookings);
  } catch (err) {
    console.error('Booking fetch error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.create = async (req, res) => {
  try {
    const booking = await bookingService.create({ ...req.body, tenantId: req.user.id });
    res.status(201).json(booking);
  } catch (err) {
    console.error('Booking creation error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.update = async (req, res) => {
  try {
    const booking = await bookingService.updateById(req.params.id, req.body);
    res.json(booking);
  } catch (err) {
    console.error('Booking update error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.delete = async (req, res) => {
  try {
    await bookingService.deleteById(req.params.id);
    res.json({ message: 'Booking deleted' });
  } catch (err) {
    console.error('Booking deletion error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
