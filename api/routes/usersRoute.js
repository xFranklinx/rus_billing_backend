// routes/userRoutes.js
const Router = require('express').Router()
const { getUsers, createUser, getUser, updateUser, deleteUser, login, getLeadsAndManagers } = require('../controllers/usersController');

Router
  .route('/')
  .get(getUsers)
  .post(createUser)

Router
  .route('/login')
  .post(login)

Router
  .route('/leadsAndManagers')
  .get(getLeadsAndManagers)

Router
  .route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser)

module.exports = Router