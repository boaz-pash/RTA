import EventModel from './models/eventModel';
import UserModel from './models/userModel';
import sequelize from './index';

const sequlizeConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to the database');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  try {
    await EventModel.sync();
    console.log('Event table created successfully');
    await UserModel.sync();
  } catch (err) {
    console.log('did not create event table');
    console.error(err);
  }
};

export default sequlizeConnection;