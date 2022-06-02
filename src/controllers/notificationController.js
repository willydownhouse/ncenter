const {
  Notification,
  User,
  UserNotification,
} = require('../../database/models');
const AppError = require('../utils/AppError');

const changeNotificationStatus = async (req, res) => {
  const { id } = req.params;

  const notification = await Notification.findByPk(id, {
    include: [
      {
        model: User,
      },
    ],
  });

  if (!notification) {
    throw new AppError('No notification with that id', 400);
  }

  if (
    !notification.dataValues.Users.map(ob => ob.dataValues)
      .map(ob => ob.id)
      .includes(req.user.id)
  ) {
    throw new AppError('You cannot modify this notification');
  }

  const myNotification = await UserNotification.findOne({
    where: {
      UserId: req.user.id,
      NotificationId: notification.id,
    },
  });

  const updatedNotification = await myNotification.update({
    read: true,
  });

  res.status(200).json(updatedNotification);
};

const getAllMyNotifications = async (req, res) => {
  const notifications = await Notification.findAll({
    include: [
      {
        model: User,
        attributes: {
          exclude: ['password', 'createdAt', 'updatedAt', 'role'],
        },
        through: {
          attributes: ['read'],
        },
        where: {
          id: req.user.id,
        },
      },
    ],
    attributes: {
      exclude: ['updatedAt', 'userId'],
    },
  });

  res.status(200).json({
    docs: notifications.length,
    notifications,
  });
};

const createNotification = async (req, res, next) => {
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

  let ids = [];

  users.forEach(async id => {
    try {
      const res = await UserNotification.create({
        UserId: id,
        NotificationId: notification.id,
      });
      ids.push(res.dataValues.UserId);
    } catch (err) {
      return next(new AppError(err.parent.detail, 400));
    }

    if (ids.length === users.length) {
      return res.status(201).json({
        notification,
        createdForUsers: users,
      });
    }
  });
};

module.exports = {
  getAllMyNotifications,
  createNotification,
  changeNotificationStatus,
};
