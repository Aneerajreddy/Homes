const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const auth = require('../middleware/auth');

router.get('/', propertyController.getAll);
router.post('/', auth, propertyController.create);
router.put('/:id', auth, propertyController.update);
router.delete('/:id', auth, propertyController.delete);

module.exports = router;
