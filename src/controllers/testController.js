const { User } = require('../../database/models');

const deleteUserAfterSignUpTest = async (req, res) => {
  const response = await User.destroy({ where: { email: req.query.email } });

  res.send(response === 1 ? 'user deleted' : 'user not deleted');
};

module.exports = {
  deleteUserAfterSignUpTest,
};
