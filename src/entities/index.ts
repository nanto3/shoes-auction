import sequelize from '../configs/sequelize.config';
import User, { UserFactory } from './user.entity';
import Product, { ProductFactory } from './product.entity';
import Auction, { AuctionFactory } from './auction.entity';

const _User = UserFactory( sequelize );
const _Product = ProductFactory( sequelize );
const _Auction = AuctionFactory( sequelize );

_User.hasMany( _Product, { as: 'products' });
_Product.belongsTo( _User );

_User.hasMany( _Auction, { as: 'auctions' });
_Auction.belongsTo( _User );

_Product.hasMany( _Auction, { as: 'auctions' });
_Auction.belongsTo( _Product );

export const checkDbConnection = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log( 'Db connection has been established' );
  } catch ( error ) {
    console.log( error, 'Unable to connect to the database error' );
  }
};

export { sequelize, User, Product, Auction };
