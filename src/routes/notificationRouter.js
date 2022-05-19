const express = require('express');
const notificationController = require('../controllers/notificationController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.route('/').get(notificationController.getAllMyNotifications);

router.route('/:id').patch(notificationController.changeNotificationStatus);

router.use(authController.restrictTo('admin'));

router.route('/').post(notificationController.createNotification);

module.exports = router;
