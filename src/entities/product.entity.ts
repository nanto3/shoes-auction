import { Sequelize, Model, DataTypes, CreationOptional, ForeignKey, InferAttributes, InferCreationAttributes, NonAttribute } from 'sequelize';
import User from './user.entity';
import Auction from './auction.entity';

export default class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {
  declare readonly id: CreationOptional<number>;
  declare readonly userId: ForeignKey<User['id']>;
  declare readonly brand: 'NIKE'|'ADIDAS'|'ETC';
  declare name: string;
  declare price: number;
  declare status: CreationOptional<'SELLING'|'WAITING'|'SOLD'|'PENDING'|'FAILED'>;
  declare image: string | null;
  declare auctionCloseDate: Date;
  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
  
  declare auctions: NonAttribute<Auction[]>;

  findMyAuction( userId: number ) {
    return this.auctions.find( auction => auction.userId === userId );
  }
}

export const ProductFactory = ( sequelize: Sequelize ) => Product.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  brand: {
    type: DataTypes.ENUM( 'NIKE', 'ADIDAS', 'ETC' ),
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM( 'SELLING','WAITING','SOLD','PENDING','FAILED' ),
    defaultValue: 'SELLING',
    allowNull: false,
  },
  image: DataTypes.STRING,
  auctionCloseDate: {
    comment: '경매 마감 날짜',
    type: DataTypes.DATE,
    allowNull: false,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize,
  underscored: true,
});
