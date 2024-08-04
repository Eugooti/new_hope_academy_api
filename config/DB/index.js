const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

const db = mongoose.connection;

// Event for successful connection
db.once('open', () => {
    console.log('Connected to MongoDB');
    // You can emit a custom event or perform actions here
    db.emit('mongodbConnected');
});

// Event for connection errors
db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
    // You can emit a custom event or perform actions here
    db.emit('mongodbError', error);
});

mongoose.connect(uri);

module.exports = mongoose;
