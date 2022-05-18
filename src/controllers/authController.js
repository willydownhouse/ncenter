const { User } = require('../../database/models');
const AppError = require('../utils/AppError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signUp = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError('Please give your email and password', 400);
  }

  const hash = await bcrypt.hash(password, 10);

  const response = await User.create({
    email,
    password: hash,
    role: 'client',
  });

  const user = response.dataValues;
  delete user.password;

  res.status(201).json({
    user,
  });
};
const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError('Please give your email and password', 400);
  }

  const user = await User.findOne({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new AppError('Wrong email or password', 401);
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(200).json({
    token,
  });
};

const protect = async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer')
  ) {
    throw new AppError('Please sign in to get access', 401);
  }

  const token = req.headers.authorization.substring(7);

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const userFound = await User.findOne({ where: { id: decoded.id } });

  if (!userFound) {
    throw new AppError('Please create account to get access');
  }

  const user = userFound.dataValues;
  delete user.password;

  console.log(user);

  req.user = user;

  next();
};

const restrictTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new AppError('You are not allowed to do this action', 401);
    }

    next();
  };
const signOut = (req, res, next) => {
  res.send('signOut');
};

const oauth = (req, res, next) => {
  res.send('oauth');
};

module.exports = {
  signUp,
  signIn,
  restrictTo,
  signOut,
  protect,
  oauth,
};
