const express = require('express')
const app = express()
const colors = require('colors')
const morgan = require('morgan')
const cors = require('cors')
const dotenv = require('dotenv').config({ path: './config/config.env' })
const session = require('express-session');
const passport = require('passport');

const PORT = process.env.PORT || 5000


// MongoDB Connection
const mongoDB = require('./config/mongoDB')
mongoDB.connect()


// Middleware
const authMiddleware = require('./api/middleware/auth')


// Routes
const authRoute = require('./api/routes/authRoute')
const usersRoute = require('./api/routes/usersRoute')
const customersRoute = require('./api/routes/customersRoute')
const purchaseOrdersRoute = require('./api/routes/reports/purchaseOrdersRoute')
// Forms Routes
const billingAdjustmentsFormsRoute = require('./api/routes/forms/billingAdjustmentsFormsRoute')


// CORS configuration
const corsOptions = {
  origin: '*', // Be cautious with this in production
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
}


// Middlewares
app.use(express.json())
app.use(morgan('combined'))
app.use(cors(corsOptions))


// Session middleware
app.use(session({
  secret: process.env.GOOGLE_SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));


// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


// Welcome Route
app.get('/api/v1/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the API!'
  })
})


// Route Handlers
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/users', usersRoute)
app.use('/api/v1/customers', authMiddleware, customersRoute)
app.use('/api/v1/reports/purchaseOrders', authMiddleware, purchaseOrdersRoute)
// Forms Routes Handlers
app.use('/api/v1/forms/billingAdjustments', authMiddleware, billingAdjustmentsFormsRoute)


// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});


// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', err);
  // Close server & exit process
  server.close(() => process.exit(1));
});


const server = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`.yellow.bold)
})