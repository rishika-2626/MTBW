const express = require('express');
const router = express.Router();
const theatreController = require('..controllers/theatreController');

router.get('/',theatreController.getAllTheatres);
router.get('/:id', theatreController.getTheatreById);
router.get('/:id/showtimes', theatreController.getShowtimesForTheatre);

module.exports = router;

