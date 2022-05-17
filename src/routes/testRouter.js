const express = require('express');
const testController = require('../controllers/testController');

const router = express.Router();

router.route('/users/').delete(testController.deleteUserAfterSignUpTest);

module.exports = router;
