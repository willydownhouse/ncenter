const express = require('express');
const authController = require('../controllers/authController');
const passport = require('passport');

const router = express.Router();

router.route('/signup').post(authController.signUp);
router.route('/signin').post(authController.signIn);
router.route('/signout').post(authController.signOut);
router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureMessage: 'Login failure' }),
  (req, res) => {
    console.log(req.session);

    req.user = req.session.passport.user;

    res.send('success login');
  }
);

router.get('/auth/logout', (req, res, next) => {
  console.log('req.session');
  console.log(req.session);
  req.session = null;
  console.log('requser:');
  console.log(req.user);

  req.logout(err => {
    console.log('LOGOUT:');
    console.log(req.session);
    console.log(req.user);
    if (err) {
      return next(err);
    }
    res.send('you logged out');
  });
});

module.exports = router;
