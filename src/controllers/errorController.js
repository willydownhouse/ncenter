module.exports = (err, req, res, next) => {
  console.log('FROM ERROR CONTROLLER 😎😎');
  console.log(err.message);

  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      message: err.message,
    });
  }

  return res.status(err.statusCode).json({
    message: err.message,
  });
};
