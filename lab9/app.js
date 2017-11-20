/**
 * Created by yangyang on 11/20/17.
 */
const express = require('express')
const passport = require('passport')
const Strategy = require('passport-local').Strategy
const exphbs = require('express-handlebars')
const users = require('./users')
const flash = require('express-flash')

// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(new Strategy(
  function (username, password, cb) {
    try {

      let user = null
      for (let u of users) {
        if (u.username === username) user = u
      }

      if (!user) return cb(null, false, {message:'invalid user name'})
      if (user.hashedPassword !== password) return cb(null, false ,  {message:'invalid password name'})
      return cb(null, user)

    } catch (err) {
      return cb(err)
    }

  }))

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function (user, cb) {
  cb(null, user._id)
})

passport.deserializeUser(function (id, cb) {
  try {
    let user = null
    for (let u of users) {
      if (u._id === id) user = u
    }
    cb(null, user)

  } catch (err) {
    return cb(err)
  }

})

const app = express()

// Configure view engine to render EJS templates.
app.set('view engine', 'handlebars')
app.engine('handlebars', exphbs({}))

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(flash())
app.use(require('cookie-parser')())
app.use(require('body-parser').urlencoded({extended: true}))
app.use(require('express-session')({secret: 'keyboard cat', resave: false, saveUninitialized: false}))

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize())
app.use(passport.session())

app.post('/login', passport.authenticate('local' , {
  successRedirect: '/private',
  failureRedirect: '/',
  failureFlash: true
}))

app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/private')
  } else {
    const err = req.flash('error')
    console.log(err)
    res.render('login', {error:err})
  }
})

app.get('/private', (req, res) => {
  res.render('private',{user:req.user})
})

app.listen(3000, () => {
  console.log('We\'ve now got a server!')
  console.log('Your routes will be running on http://localhost:3000')
})
