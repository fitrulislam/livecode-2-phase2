const router = require('express').Router()
const itemController = require('../controllers/reviewController')

router
  .post('/create', reviewController.create)
  .get('/read', reviewController.read)
  .delete('/delete/:id', reviewController.delete)

module.exports = router
