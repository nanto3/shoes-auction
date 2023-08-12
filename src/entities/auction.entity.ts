import { Sequelize, Model, DataTypes, CreationOptional, ForeignKey, InferAttributes, InferCreationAttributes } from 'sequelize';
import User from './user.entity';
import Product from './product.entity';

export default class Auction extends Model<InferAttributes<Auction>, InferCreationAttributes<Auction>> {
  declare readonly id: CreationOptional<number>;
  declare readonly userId: ForeignKey<User['id']>;
  declare readonly productId: ForeignKey<Product['id']>;
  declare bidPrice: number;
  declare result: CreationOptional<boolean>;
  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
}

// TODO: '최고 입찰가보다 적은 금액은 입찰 불가 처리' 어떻게 할 건지
export const AuctionFactory = ( sequelize: Sequelize ) => Auction.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  // productUuid: {
  //   type: DataTypes.STRING,
  //   primaryKey: true,
  // },
  // userUuid: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  // },
  bidPrice: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  result: {
    comment: '낙찰 여부',
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize,
  underscored: true,
});
