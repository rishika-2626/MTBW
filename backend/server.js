const express = require('express');
const mongoose = require('mongoose');

const movieRoutes = require('./backend/routes/movieRoutes');
const theatreRoutes = require('./routes/theatreRoutes');
const showtimeRoutes = require('./routes/showtimeRoutes');
const bookingRoutes = require('./backend/routes/bookingRoutes');

const app = express();
app.use(express.json()); // this makes it possible for your express server to understand and work with json data sent by clients

app.use('/api/movies', movieRoutes);
app.use('/api/theatres', theatreRoutes);
app.use('/api/showtimes', showtimeRoutes);
app.use('/api/bookings', bookingRoutes);

mongoose.connect('mongodb://localhost:27017/cinemaverse')
.then(() => console.log('DB connected'))
.catch(err => console.error(err));

app.listen(5000, () => console.log('Server running on port 5000'));
