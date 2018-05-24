const router = require('express').Router()
const reviewController = require('../controllers/reviewController')
const { auth } = require('../middleware/auth')

router
  .post('/create', auth, reviewController.create)
  .get('/read', reviewController.read)
  .delete('/delete/:id', reviewController.delete)

module.exports = router
