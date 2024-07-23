const Router = require('express').Router()
const { getAllSolutionsBillingAdjustments, createSolutionsBillingAdjustments, getSolutionsBillingAdjustmentsById, updateSolutionsBillingAdjustments, deleteSolutionsBillingAdjustments } = require('../../controllers/forms/FormsSolutionsBillingAdjustmentsController')

Router
  .route('/')
  .get(getAllSolutionsBillingAdjustments)
  .post(createSolutionsBillingAdjustments)

Router
  .route('/:id')
  .get(getSolutionsBillingAdjustmentsById)
  .put(updateSolutionsBillingAdjustments)
  .delete(deleteSolutionsBillingAdjustments)

module.exports = Router