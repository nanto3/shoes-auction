// import { Sequelize, Op } from 'sequelize';
// import sequelizeConfig from '../configs/sequelize';
// import envConfig from '../configs/env';

// import UserFactory from './user';

// const { env } = envConfig;

// interface SequelizeConfig {
//     database: string;
//     username: string;
//     password: string;
//     options: Record<string, unknown>;
// }
// const { database, username, password, options }: SequelizeConfig = sequelizeConfig;

// export const sequelize = new Sequelize( database, username, password, options );

// const db = {
//   sequelize,
//   Sequelize,
//   User: UserFactory( sequelize ),
//   Op,
// };

// // sequelize
// export const checkDbConnection = ( async () => {
//   try {
//     await db.sequelize.authenticate();
//     if ( env === 'DEV' ) {
//       await db.sequelize.sync({ force: true, alter: true });
//     }
//   } catch ( error ) {
//     console.log( error );
//   }
// })();

// export default db;
