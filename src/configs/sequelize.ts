import envConfig from './env';

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
  },
};

export default sequelizeConfig;
