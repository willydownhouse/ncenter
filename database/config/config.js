require('dotenv').config();

module.exports = {
  development: {
    use_env_variable: process.env.DB_URL,
    url: process.env.DB_URL,
    dialect: 'postgres',
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: 'postgres',
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
  },
};
