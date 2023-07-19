import sequelize from '../configs/sequelize.config';
import { UserFactory } from './User';

export const User = UserFactory( sequelize );

export const checkDbConnection = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log( 'Db connection has been established' );
  } catch ( error ) {
    console.log( error, 'Unable to connect to the database error' );
  }
};
