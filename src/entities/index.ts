import sequelize from '../configs/sequelize.config';
import User, { UserFactory } from './user.entity';
import Product, { ProductFactory } from './product.entity';
import Auction, { AuctionFactory } from './auction.entity';

const _User = UserFactory( sequelize );
const _Product = ProductFactory( sequelize );
const _Auction = AuctionFactory( sequelize );

_User.hasMany( _Product, { as: 'products', foreignKey: 'userId' });
_Product.belongsTo( _User, { foreignKey: 'userId' });

_User.hasMany( _Auction, { as: 'auctions', foreignKey: 'userId' });
_Auction.belongsTo( _User, { foreignKey: 'userId' });

_Product.hasMany( _Auction, { as: 'auctions', foreignKey: 'productId' });
_Auction.belongsTo( _Product, { foreignKey: 'productId' });

export const checkDbConnection = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    // await sequelize.sync({ force: true });
    // await sequelize.sync({ alter: true });
    console.log( 'Db connection has been established' );
  } catch ( error ) {
    console.log( error, 'Unable to connect to the database error' );
  }
};

export { sequelize, User, Product, Auction };
