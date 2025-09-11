const express = require('express');
const router = express.Router();
const { favoriteService, userService } = require('../services/database');

// Add property to favorites
router.post('/:propertyId', async (req, res) => {
  try {
    const user = await userService.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    // Check if favorite already exists
    const existingFavorite = await favoriteService.findUserFavorite(req.user.id, req.params.propertyId);
    if (existingFavorite) {
      const userFavorites = await favoriteService.findByUser(req.user.id);
      return res.json({ favorites: userFavorites });
    }
    
    // Create new favorite
    await favoriteService.create({
      userId: req.user.id,
      propertyId: req.params.propertyId
    });
    
    const userFavorites = await favoriteService.findByUser(req.user.id);
    res.json({ favorites: userFavorites });
  } catch (err) {
    console.error('Add favorite error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove property from favorites
router.delete('/:propertyId', async (req, res) => {
  try {
    const user = await userService.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    await favoriteService.deleteUserFavorite(req.user.id, req.params.propertyId);
    const userFavorites = await favoriteService.findByUser(req.user.id);
    res.json({ favorites: userFavorites });
  } catch (err) {
    console.error('Remove favorite error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// List all favorite properties
router.get('/', async (req, res) => {
  try {
    const user = await userService.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    const userFavorites = await favoriteService.findByUser(req.user.id);
    res.json({ favorites: userFavorites });
  } catch (err) {
    console.error('Get favorites error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
