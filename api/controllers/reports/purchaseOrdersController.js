const PurchaseOrder = require('../../models/reports/purchaseOrdersModel')

exports.getPurchaseOrders = ('/', async (req, res) => {
  try {
    const results = await PurchaseOrder.find()

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


exports.createPurchaseOrder = ('/', async (req, res) => {
  try {
    const purchaseOrder = await PurchaseOrder.create(req.body)

    res.status(201).json({
      success: true,
      data: purchaseOrder
    })

  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'An error occurred when processing your request',
      error: err
    })
  }
})


exports.getPurchaseOrder = ('/:id', async (req, res) => {
  try {
    const purchaseOrder = await PurchaseOrder.findById(req.params.id)

    if (!purchaseOrder) {
      res.status(404).json({
        success: false,
        message: 'Purchase Order not found'
      })
    }

    res.status(200).json({
      success: true,
      data: purchaseOrder
    })

  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'An error occurred when processing your request',
      error: err
    })
  }
})

exports.updatePurchaseOrder = ('/:id', async (req, res) => {
  try {
    const purchaseOrder = await PurchaseOrder.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })

    if (!purchaseOrder) {
      res.status(404).json({
        success: false,
        message: 'Purchase Order not found'
      })
    }

    res.status(200).json({
      success: true,
      data: purchaseOrder
    })

  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'An error occurred when processing your request',
      error: err
    })
  }
})

exports.deletePurchaseOrder = ('/:id', async (req, res) => {
  try {
    const purchaseOrder = await PurchaseOrder.findByIdAndDelete(req.params.id)

    if (!purchaseOrder) {
      res.status(404).json({
        success: false,
        message: 'Purchase Order not found'
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