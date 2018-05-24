const router = require('express').Router()
const bookController = require('../controllers/bookController')
const multer = require('multer')
const images = require('../middleware/images')
const { auth } = require('../middleware/auth')

router
  .post('/create', auth, images.multer.single('image'), images.sendUploadToGCS, bookController.create)
  .get('/read', bookController.read)
  .get('/readbyacc', auth, bookController.readByAcc)
  .get('/findone/:id', bookController.findOne)
  .delete('/delete/:id', bookController.delete)

module.exports = router
