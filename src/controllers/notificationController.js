const {
  Notification,
  User,
  UserNotification,
} = require('../../database/models');
const AppError = require('../utils/AppError');

const getAllMyNotifications = async (req, res) => {
  const notifications = await Notification.findAll({
    include: [
      {
        model: User,
        attributes: {
          exclude: ['password', 'createdAt', 'updatedAt'],
        },
        through: {
          attributes: [],
        },
        where: {
          id: req.user.id,
        },
      },
    ],
    attributes: {
      exclude: ['updatedAt'],
    },
  });

  res.status(200).json({
    docs: notifications.length,
    notifications,
  });
};

const createNotification = async (req, res, next) => {
  console.log(req.body);

  const { title, text, users } = req.body;

  if (!title || !text || !users) {
    throw new AppError('Not a valid notification', 400);
  }

  if (users.length === 0) {
    throw new AppError('Please sent notification at least one user', 400);
  }

  const notification = await Notification.create({
    title,
    text,
    userId: req.user.id,
  });

  Promise.all(users).then(users => {
    users.map(id => {
      UserNotification.create({
        userId: id,
        notificationId: notification.id,
      });
    });
  });

  return res.status(201).json(notification);
};

module.exports = {
  getAllMyNotifications,
  createNotification,
};
