const app = require('./app');
const Sequelize = require('sequelize');
var pg = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 3001;

const sequelize = new Sequelize(process.env.DB_URL);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('db connected');
  } catch (err) {
    console.log(err);
    console.log('db connection fail');
  }
};

connectDB();

app.listen(PORT, () => {
  console.log(`App listening port ${PORT}`);
});
