const Customer = require('../models/customersModel')

exports.getCustomers = ('/', async (req, res) => {
  try {
    const results = await Customer.find()

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


exports.createCustomer = ('/', async (req, res) => {
  try {
    const customer = await Customer.create(req.body)

    res.status(201).json({
      success: true,
      data: customer
    })

  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'An error occurred when processing your request',
      error: err
    })
  }
})


exports.getCustomer = ('/:id', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id)

    if (!customer) {
      res.status(404).json({
        success: false,
        message: 'Customer not found'
      })
    }

    res.status(200).json({
      success: true,
      data: customer
    })

  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'An error occurred when processing your request',
      error: err
    })
  }
})


exports.updateCustomer = ('/:id', async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params, req.body, {
      new: true,
      runValidators: true
    })

    if (!customer) {
      res.status(404).json({
        success: false,
        message: 'Customer not found'
      })
    }

    res.status(200).json({
      success: true,
      data: customer
    })

  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'An error occurred when processing your request',
      error: err
    })
  }
})


exports.deleteCustomer = ('/:id', async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id)

    if (!customer) {
      res.status(404).json({
        success: false,
        message: 'Customer not found'
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