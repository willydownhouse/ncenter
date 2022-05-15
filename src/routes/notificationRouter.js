const express = require('express');
const notificationController = require('../controllers/notificationController');

const router = express.Router();

router
  .route('/')
  .get(notificationController.getAllNotification)
  .post(notificationController.createNotification);

module.exports = router;
