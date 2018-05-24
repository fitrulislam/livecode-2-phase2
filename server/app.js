const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const app = express()

const port = process.env.PORT || 3000

const url = `mongodb://admin:admin@ds233500.mlab.com:33500/livecode`
mongoose.connect(url, (err) => {
  if (!err) console.log('connected to database')
  else throw new Error(err)
})

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

app.get('/', (req, res) => {
  res.send('ini home')
})

app.use('/book', require('./routes/book'))
app.use('/review', require('./routes/review'))

app.listen(port, () => {
  console.log(`app running on ${port}`)
})
