import envConfig from './env.config';
import { Sequelize, Options } from 'sequelize';

const { database, username, password, host, dbPort } = envConfig;

const options: Options = {
  host: host,
  port: +dbPort,
  dialect: 'mysql',
  timezone: '+09:00',
  pool: {
    max: 5,
    min: 1,
    idle: 10000,
  },
  logQueryParameters: true,
  logging: ( msg ) => console.log({ QUERY: msg }),
};

const sequelize = new Sequelize( database, username, password, options );

export const checkConnection = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log( 'Db connection has been established' );
  } catch ( error ) {
    console.log( error, 'Unable to connect to the database error' );
  }
};

export default sequelize;
