import { Sequelize, Model, DataTypes, CreationOptional, NonAttribute, InferAttributes, InferCreationAttributes } from 'sequelize';
import Product from './product.entity';
import Auction from './auction.entity';

import bcrypt from 'bcrypt';
import envConfig from '../configs/env.config';

export default class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare readonly id: CreationOptional<number>;
  declare readonly email: string;
  declare password: string;
  declare readonly birthday: string;
  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
  declare readonly deletedAt: Date | null;
  declare readonly products: NonAttribute<Product>;
  declare readonly auctions: NonAttribute<Auction>;

  async validatePassword( password: string ): Promise<boolean> {
    return await bcrypt.compare( password, this.password );
  }

  async setNewPassword( password: string ) {
    const salt = await bcrypt.genSalt( +envConfig.passwordSalt ); 
    this.password = await bcrypt.hash( password, salt );
  }

  static async of({ email, password, birthday }) {
    const salt = await bcrypt.genSalt( +envConfig.passwordSalt ); 
    password = await bcrypt.hash( password, salt );

    return new User({ email, password, birthday });
  }
}

export const UserFactory = ( sequelize: Sequelize ) => User.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birthday: {
    type: DataTypes.STRING( 8 ),
    allowNull: false,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
  deletedAt: DataTypes.DATE,
}, {
  sequelize,
  paranoid: true,
  underscored: true,
  
  // hooks: {
  //   beforeCreate: async ( user: User ) => {
  //     await user.hashPassword();
  //   },
  // },
});
