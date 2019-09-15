var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', isLoggedIn, (req, res, next) => {
  res.render('video/index', { title: 'Home' , user: req.session.user});
});

router.get('/login', (req, res, next) => {
  res.render('login', { title: 'Login' });
});

router.get('/signup', (req, res, next) => {
  res.render('signup', { title: 'Sign Up' });
});

router.get('/:id', isLoggedIn, (req, res, next) => {
  res.render('video/detail', { title: 'Detail' , id: req.params.id, user: req.session.user});
});

module.exports = router;

function isLoggedIn (req, res, next) {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
}