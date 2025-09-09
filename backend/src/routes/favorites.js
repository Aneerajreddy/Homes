const express = require('express');
const router = express.Router();
// const { requireAuth } = require('../middleware/auth');
const User = require('../models/User');

// Add property to favorites
router.post('/:propertyId', async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (!user.favorites) user.favorites = [];
    if (!user.favorites.includes(req.params.propertyId)) {
      user.favorites.push(req.params.propertyId);
      await user.save();
    }
    res.json({ favorites: user.favorites });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove property from favorites
router.delete('/:propertyId', async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.favorites = (user.favorites || []).filter(id => id !== req.params.propertyId);
    await user.save();
    res.json({ favorites: user.favorites });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// List all favorite properties
router.get('/', async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('favorites');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ favorites: user.favorites });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
