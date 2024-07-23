const SolutionsBillingAdjustments = require('../../models/forms/FormsSolutionsBillingAdjustmentsModel')


exports.getAllSolutionsBillingAdjustments = ('/', async (req, res) => {
  try {
    const results = await SolutionsBillingAdjustments.find()

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


exports.createSolutionsBillingAdjustments = ('/', async (req, res) => {
  try {
    const results = await SolutionsBillingAdjustments.create(req.body)

    res.status(201).json({
      success: true,
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


exports.getSolutionsBillingAdjustmentsById = ('/:id', async (req, res) => {
  try {
    const results = await SolutionsBillingAdjustments.findById(req.params.id)

    res.status(200).json({
      success: true,
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


exports.updateSolutionsBillingAdjustments = ('/:id', async (req, res) => {
  try {
    const results = await SolutionsBillingAdjustments.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json({
      success: true,
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


exports.deleteSolutionsBillingAdjustments = ('/:id', async (req, res) => {
  try {
    const results = await SolutionsBillingAdjustments.findByIdAndDelete(req.params.id)

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