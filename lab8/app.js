/**
 * Created by yangyang on 11/5/17.
 */
const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

app.use('/public', express.static(__dirname + '/public'))

app.get('*', (req, res, next) => {
  res.render('contents/body')
})

app.engine('handlebars', exphbs({defaultLayout: 'main'}))

app.set('view engine', 'handlebars')

app.listen(3000, () => {
  console.log('We\'ve now got a server!')
  console.log('Your routes will be running on http://localhost:3000')
})
