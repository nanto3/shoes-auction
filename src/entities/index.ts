import sequelize from '../configs/sequelize.config';
import { UserFactory } from './user.entity';
import { ProductFactory } from './product.entity';
import { AuctionFactory } from './auction.entity';

const User = UserFactory( sequelize );
const Product = ProductFactory( sequelize );
const Auction = AuctionFactory( sequelize );

User.hasMany( Product, { as: 'products' });
Product.belongsTo( User );

User.hasMany( Auction, { as: 'auctions' });
Auction.belongsTo( User );

Product.hasMany( Auction, { as: 'auctions' });
Auction.belongsTo( Product );

export const checkDbConnection = new Promise( async ( resolve, _ ) => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log( 'Db connection has been established' );
    resolve( true );
  } catch ( error ) {
    console.log( error, 'Unable to connect to the database error' );
  }
});
