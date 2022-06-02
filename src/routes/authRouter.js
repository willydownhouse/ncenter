const express = require('express');
const authController = require('../controllers/authController');
const passport = require('passport');

const router = express.Router();

router.route('/signup').post(authController.signUp);
router.route('/signin').post(authController.signIn);

router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureMessage: 'Login failure' }),
  authController.googleAuthSuccess
);

router.get('/auth/logout', authController.signOut);

module.exports = router;
