var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('video/index', { title: 'Home' });
});

router.get('/login', (req, res, next) => {
  res.render('login', { title: 'Login' });
});

router.get('/signup', (req, res, next) => {
  res.render('signup', { title: 'Sign Up' });
});

router.get('/:id', (req, res, next) => {
  res.render('video/detail', { title: 'Detail' , id: req.params.id});
});

module.exports = router;
