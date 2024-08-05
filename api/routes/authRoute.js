const express = require('express');
const Router = express.Router();
const { login, googleAuth, googleAuthCallback } = require('../controllers/authController');


Router
  .route('/login')
  .post(login);

Router
  .route('/google')
  .get(googleAuth);

Router
  .route('/google/callback')
  .get(googleAuthCallback);

module.exports = Router;