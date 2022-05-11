import app from './app';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3001;

export const sequelize = new Sequelize(process.env.DB_URL as string, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: true,
    },
  },
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('db connected');
  } catch (err) {
    console.log(err);
    console.log('db connection failure');
    process.exit(1);
  }
};

connectDB().catch(err => console.log(err));

app.listen(PORT, () => {
  console.log(`App listening port ${PORT}`);
});
