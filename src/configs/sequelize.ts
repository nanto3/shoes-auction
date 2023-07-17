import envConfig from './env';
import { Sequelize } from 'sequelize';

const { database, username, password, host, dbPort } = envConfig;

const sequelizeConfig = {
  type: 'mysql',
  database: database,
  username: username,
  password: password,
  options: {
    host: host,
    port: dbPort,
    dialect: 'mysql',
    timezone: '+09:00',
    pool: {
      max: 5,
      min: 1,
      idle: 10000,
    },
    logQueryParameters: true,
    logging: ( msg ) => console.log({ dbMsg: msg }),
  },
};

const sequelize = new Sequelize( sequelizeConfig );
sequelize.sync({ force: true });
sequelize.authenticate();

export default sequelize;
