const Router = require('express').Router()
const {
  getPurchaseOrders,
  createPurchaseOrder,
  getPurchaseOrder,
  updatePurchaseOrder,
  deletePurchaseOrder
} = require('../../controllers/reports/purchaseOrdersController')

Router
  .route('/')
  .get(getPurchaseOrders)
  .post(createPurchaseOrder)

Router
  .route('/:id')
  .get(getPurchaseOrder)
  .put(updatePurchaseOrder)
  .delete(deletePurchaseOrder)

module.exports = Router