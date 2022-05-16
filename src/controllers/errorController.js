module.exports = (err, req, res, next) => {
  console.log('FROM ERROR CONTROLLER 😎😎');
  console.log(err);

  const statusCode = err.statusCode || 500;

  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      message: err.message,
    });
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({
      message: err.errors[0].message,
    });
  }

  return res.status(statusCode).json({
    message: err.message,
  });
};
