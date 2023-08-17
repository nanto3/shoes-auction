import { Sequelize, Model, DataTypes, CreationOptional, ForeignKey, InferAttributes, InferCreationAttributes } from 'sequelize';
import User from './user.entity';
import Product from './product.entity';

export default class Auction extends Model<InferAttributes<Auction>, InferCreationAttributes<Auction>> {
  declare readonly id: CreationOptional<number>;
  declare readonly userId: ForeignKey<User['id']>;
  declare readonly productId: ForeignKey<Product['id']>;
  declare bidPrice: number;
  declare result: CreationOptional<'PENDING' | 'FAILED' | 'SUCCEEDED'>;
  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;

  checkCloseDate( closeDate: Date ) {
    return this.createdAt <= new Date( closeDate ); 
  }
}

export const AuctionFactory = ( sequelize: Sequelize ) => Auction.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  productId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    unique: 'auctionUnique',
  },
  userId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  bidPrice: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    unique: 'auctionUnique',
  },
  result: {
    comment: '낙찰 여부',
    type: DataTypes.ENUM( 'PENDING', 'FAILED', 'SUCCEEDED' ),
    defaultValue: 'PENDING',
    allowNull: false,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize,
  underscored: true,
});
