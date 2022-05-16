const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/signup').post(authController.signUp);
router.route('/signin').post(authController.signIn);
router.route('/signout').post(authController.signOut);
router.route('/oauth').post(authController.oauth);

module.exports = router;
