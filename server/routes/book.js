const router = require('express').Router()
const itemController = require('../controllers/bookController')
const multer = require('multer')
const images = require('../middleware/images')

router
  .post('/create', images.multer.single('image'), images.sendUploadToGCS, bookController.create)
  .get('/read', bookController.read)
  .get('/readbyacc', bookController.readByAcc)
  .get('/findone/:id', bookController.findOne)
  .delete('/delete/:id', bookController.delete)

module.exports = router
