const express = require('express');
const mongoose = require('./config/DB/index');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/admin.router');
const authRoutes = require('./routes/auth.router');
const {swaggerDocs} = require('./config/swaggerConfig/index');
const crypto = require('crypto');
require('dotenv').config();
const { notFound } = require('./handlers/errorHandlers');

const port = process.env.PORT || 4500;
const generateSecretKey = () => {
    return crypto.randomBytes(32).toString('hex');
};

const app = express();

mongoose.connection.on('mongodbConnected', () => {
    app.use(cors());
    app.use(morgan('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(session({
        secret: generateSecretKey(),
        resave: false,
        saveUninitialized: false,
    }));

    app.use('/api-docs', swaggerDocs.ui, swaggerDocs.setup);

    app.use('/nha', authRoutes);
    app.use('/nha', adminRoutes);


    app.use(notFound);

    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}/nha`);
    });
});

mongoose.connection.on('mongodbError', (error) => {
    console.error('MongoDB connection error:', error);
});

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
