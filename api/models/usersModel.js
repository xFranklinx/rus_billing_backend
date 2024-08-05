const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: false,
  },
  accountType: {
    type: String,
    enum: ['Admin', 'Manager', 'Team Lead', 'Team Member', 'Field Agent'],
    default: 'Team Member',
  },
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  department: {
    type: String,
    required: false,
  },
  position: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastLoginDate: {
    type: Date,
    default: null
  }
});

const User = mongoose.model('User', usersSchema, 'users');

module.exports = User;