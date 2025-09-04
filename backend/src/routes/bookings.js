const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const auth = require('../middleware/auth');

router.get('/', bookingController.getAll);
router.post('/', auth, bookingController.create);
router.put('/:id', auth, bookingController.update);
router.delete('/:id', auth, bookingController.delete);

module.exports = router;
