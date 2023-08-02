import { Sequelize, Model, DataTypes, CreationOptional, NonAttribute, InferAttributes, InferCreationAttributes } from 'sequelize';
import Product from './ProductEntity';
import Auction from './AuctionEntity';
import UserUtil from '../utils/UserUtil';

export default class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare readonly id: CreationOptional<number>; 
  declare readonly uuid: CreationOptional<string>;
  declare email: string;
  declare password: string;
  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
  declare readonly deletedAt: Date | null;
  declare readonly products: NonAttribute<Product>;
  declare readonly auctions: NonAttribute<Auction>;
}

export const UserFactory = ( sequelize: Sequelize ) => User.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    unique: true,
    allowNull: false,
  },    
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { isEmail: true },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
  deletedAt: DataTypes.DATE,
}, {
  sequelize,
  paranoid: true,
  underscored: true,
  
  hooks: {
    beforeCreate: async ( user: User ) => {
      user.password = await UserUtil.hashPassword( user.password );
    },
  },
});
