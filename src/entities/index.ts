import sequelize from '../configs/sequelize.config';
import { UserFactory } from './User';
import { ProductFactory } from './Product';
import { AuctionFactory } from './Auction';

export const User = UserFactory( sequelize );
export const Product = ProductFactory( sequelize );
export const Auction = AuctionFactory( sequelize );

User.hasMany( Product, { as: 'products' });
Product.belongsTo( User );

User.hasMany( Auction, { as: 'auctions' });
Auction.belongsTo( User );

Product.hasMany( Auction, { as: 'auctions' });
Auction.belongsTo( Product );

export const checkDbConnection = new Promise( async ( resolve, reject ) => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log( 'Db connection has been established' );
    resolve( true );
  } catch ( error ) {
    console.log( error, 'Unable to connect to the database error' );
    reject();
  }
});
