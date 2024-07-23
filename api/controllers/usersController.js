const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
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
      error: err
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
      error: err
    })
  }
})


exports.getUser = ('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    if (!user) {
      res.status(404).json({
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
      error: err
    })
  }
})


exports.updateUser = async (req, res) => {
  try {
    // Fetch the current user from the database
    const currentUser = await User.findById(req.params.id);

    if (!currentUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Check if the password in the request body is different from the current password
    if (req.body.password && req.body.password !== currentUser.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    } else {
      // If the password hasn't changed, remove it from the request body to avoid re-hashing
      delete req.body.password;
    }

    // Update the user with the new data
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'An error occurred when processing your request',
      error: err,
    });
  }
};


exports.deleteUser = ('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)

    if (!user) {
      res.status(404).json({
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
      error: err
    })
  }
})


exports.login = ('/login', async (req, res) => {
  try {
    const { email, password } = req.body


    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: 'Please provide an email and password'
      })
    }

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      })
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).send('Invalid credentials');

    } else {
      jwt.sign({ id: user._id, email: user.email, accountType: user.accountType }, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
        if (err) throw err;
        res.status(200).json({
          success: true,
          token
        });
      });
    }

  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'An error occurred when processing your request',
      error: err
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
      error: err
    })
  }
})