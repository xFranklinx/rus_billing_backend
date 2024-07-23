const Router = require('express').Router()
const { getCustomers, createCustomer, getCustomer, updateCustomer, deleteCustomer } = require('../controllers/customersController')

Router
  .route('/')
  .get(getCustomers)
  .post(createCustomer)

Router
  .route('/:id')
  .get(getCustomer)
  .put(updateCustomer)
  .delete(deleteCustomer)

module.exports = Router