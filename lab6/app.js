/**
 * Created by yangyang on 10/13/17.
 */

const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

const storyRouter = require('./routes/storyRouter')
const eduRouter = require('./routes/eduRouter')
const aboutRouter = require('./routes/aboutRouter')

const app = express()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

app.use('/story', storyRouter)
app.use('/edu', eduRouter)
app.use('*', aboutRouter)

app.engine('handlebars', exphbs({defaultLayout:'main'}))
app.set('view engine', 'handlebars')

app.listen(3000, () => {
  console.log('We\'ve now got a server!')
  console.log('Your routes will be running on http://localhost:3000')
})
