const express = require('express');
const router = express.Router();
const furnitureOrderController = require('../controllers/furnitureOrderController');
const auth = require('../middleware/auth');

router.get('/', furnitureOrderController.getAll);
router.post('/', auth, furnitureOrderController.create);
router.put('/:id', auth, furnitureOrderController.update);
router.delete('/:id', auth, furnitureOrderController.delete);

module.exports = router;
