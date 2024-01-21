import { Sequelize } from 'sequelize';
import { config } from 'dotenv';

config();
const sequelize = new Sequelize(
  'postgres://boaz:1111@172.29.55.35:5432/R_T_E_DB'
);

export default sequelize;
