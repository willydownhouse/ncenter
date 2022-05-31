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
    console.log(req);

    res.send('success login');
  }
);

module.exports = router;
