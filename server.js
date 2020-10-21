const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });

// Protection setup
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

// Colorify the logs
const colors = require('colors');

// Connect to the DB
const connectToMongo = require('./config/db');
connectToMongo();

const app = express();

// Hook up Body Parser
app.use(express.json());

// Hook up cookies
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Security uses
app.use(mongoSanitize());
app.use(helmet());
app.use(xss());
app.use(hpp());
app.use(cors());
app.options('*', cors())

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100,
});
app.use(limiter);


app.use(express.static(path.join(__dirname, 'public')));

// Mount routes
const foodRoutes = require('./routes/foods')
app.use('/api/v1/foods', foodRoutes)

// Logging
const rfs = require('rotating-file-stream');
const accessLogStream = rfs.createStream('access.log', {
  interval: '1d',
  path: path.join(__dirname, 'log'),
});

const morgan = require('morgan');
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('common', { stream: accessLogStream }));
}

// Error Handling Middleware
const errorHandling = require('./middleware/error');
app.use(errorHandling);

const PORT = process.env.PORT || 5001;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
