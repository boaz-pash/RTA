import { DataTypes } from 'sequelize';
import sequelize from '../index';


const UserModel = sequelize.define(
  'user',
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    schema: 'auth_schema',
    tableName: 'users',
  }
);
                                                                                             
export default UserModel;
