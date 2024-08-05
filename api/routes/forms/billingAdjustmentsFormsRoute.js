const Router = require('express').Router()
const { getAdjustments, createAdjustment, getAdjustmentById, updateAdjustment, deleteAdjustment } = require('../../controllers/forms/billingAdjustmentsFormsController')

Router
  .route('/')
  .get(getAdjustments)
  .post(createAdjustment)

Router
  .route('/:id')
  .get(getAdjustmentById)
  .put(updateAdjustment)
  .delete(deleteAdjustment)

module.exports = Router