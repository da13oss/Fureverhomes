const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const homeRoute = require('./routes/home');
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const editProfileRoute = require('./routes/edit_profile');
const sheltersRoute = require('./routes/shelters');
const locationRoute = require('./routes/location');
const eventsRoute = require('./routes/events');
const newEventRoute = require('./routes/new_event');
const eventDetailsRoute = require('./routes/event_details');
const eventEditRoute = require('./routes/event_edit');
const aboutUsRoute = require('./routes/about_us');
const notificationsRoute = require('./routes/notifications');

app.use('/home', homeRoute);
app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/edit_profile', editProfileRoute);
app.use('/shelters', sheltersRoute);
app.use('/location', locationRoute);
app.use('/events', eventsRoute);
app.use('/new_event', newEventRoute);
app.use('/event_details', eventDetailsRoute);
app.use('/event_edit', eventEditRoute);
app.use('/about_us', aboutUsRoute);
app.use('/notifications', notificationsRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
