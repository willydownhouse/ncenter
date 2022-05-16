const { Notification } = require('../../database/models');
const AppError = require('../utils/AppError');

const getAllNotification = async (req, res) => {
  const notifications = await Notification.findAll();

  res.status(200).json(notifications);
};

const createNotification = async (req, res, next) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (!title || !text) {
    throw new AppError('Not a valid notification', 400);
  }

  const notification = await Notification.create({ title, text });

  return res.status(201).json(notification);
};

module.exports = {
  getAllNotification,
  createNotification,
};
