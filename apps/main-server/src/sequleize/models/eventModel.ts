import { DataTypes, Model } from 'sequelize';
import sequelize from '../index';
// import {Ievent} from 'utils/eventType';

const EventModel = sequelize.define('event', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    // allowNull: false,
  },
  event_name: {
    type: DataTypes.STRING,
    // allowNull: false,
  },
  event_description: {
    type: DataTypes.STRING,
  },
  event_location: {
    type: DataTypes.STRING,
  },event_cord: {
    type: DataTypes.STRING,
  },
  event_date: {
    type: DataTypes.DATE,
    // allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    // allowNull: false,
  },
});

export default EventModel;
