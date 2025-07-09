const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const auth = require('../middleware/auth');

router.post('/', auth, bookingController.createBooking);
router.get('/', auth, bookingController.getUserBookings);
router.get('/:id', auth, bookingController.getBookingsById);
router.delete('/:id', auth, bookingController.cancelBooking);

module.exports = router;