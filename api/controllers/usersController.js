const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/usersModel')

exports.getUsers = ('/', async (req, res) => {
  try {
    const results = await User.find()
    res.status(200).json({
      success: true,
      count: results.length,
      data: results
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'An error occurred when processing your request',
      error: err.message
    })
  }
})

exports.createUser = ('/', async (req, res) => {
  try {
    const updatedBody = { ...req.body, password: await bcrypt.hash(req.body.password, 10) }
    const user = await User.create(updatedBody)
    res.status(201).json({
      success: true,
      data: user
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'An error occurred when processing your request',
      error: err.message
    })
  }
})

exports.getUser = ('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }
    res.status(200).json({
      success: true,
      data: user
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'An error occurred when processing your request',
      error: err.message
    })
  }
})

exports.updateUser = ('/:id', async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.id);
    if (!currentUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    if (req.body.password && req.body.password !== currentUser.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    } else {
      delete req.body.password;
    }
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'An error occurred when processing your request',
      error: err.message
    });
  }
})

exports.deleteUser = ('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }
    res.status(200).json({
      success: true,
      data: {}
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'An error occurred when processing your request',
      error: err.message
    })
  }
})

exports.getLeadsAndManagers = ('/leadsAndManagers', async (req, res) => {
  try {
    const leads = await User.find({ accountType: 'Team Lead' })
    const managers = await User.find({ accountType: 'Manager' })
    const admins = await User.find({ accountType: 'Admin' })

    let leadsAndManagers = [
      ...leads,
      ...managers,
      ...admins
    ]

    res.status(200).json({
      success: true,
      data: leadsAndManagers
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'An error occurred when processing your request',
      error: err.message
    })
  }
})