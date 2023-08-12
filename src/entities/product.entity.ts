import { Sequelize, Model, DataTypes, CreationOptional, ForeignKey, InferAttributes, InferCreationAttributes } from 'sequelize';
import User from './user.entity';

export default class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {
  declare readonly id: CreationOptional<number>;
  declare readonly userId: ForeignKey<User['id']>;
  declare readonly brand: 'NIKE'|'ADIDAS'|'ETC';
  declare name: string;
  declare price: number;
  declare status: 'SELLING'|'WAITING'|'SOLD'|'PENDING'|'FAILED';
  declare image: string | null;
  declare auctionCloseDate: Date;
  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
  declare readonly deletedAt: Date | null;
}

export const ProductFactory = ( sequelize: Sequelize ) => Product.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  // userUuid: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  // },
  brand: {
    type: DataTypes.ENUM( 'NIKE', 'ADIDAS', 'ETC' ),
    defaultValue: 'ETC',
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM( 'SELLING','WAITING','SOLD','PENDING','FAILED' ),
    defaultValue: 'SELLING',
  },
  image: { type: DataTypes.STRING },
  auctionCloseDate: {
    comment: '경매 마감 날짜',
    type: DataTypes.DATE,
    allowNull: false,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
  deletedAt: DataTypes.DATE,
}, {
  sequelize,
  paranoid: true,
  underscored: true,
});
