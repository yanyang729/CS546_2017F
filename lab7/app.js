/**
 * Created by yangyang on 10/21/17.
 */
const express = require('express')
const app = express()

const restRouter = require('./routes/rest')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/lab7-recipes', {useMongoClient: true})

app.use('/',restRouter)

app.listen(3000, () => {
  console.log('We\'ve now got a server!')
  console.log('Your routes will be running on http://localhost:3000')
})
