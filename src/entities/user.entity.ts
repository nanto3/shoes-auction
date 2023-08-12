import { Sequelize, Model, DataTypes, CreationOptional, NonAttribute, InferAttributes, InferCreationAttributes } from 'sequelize';
import Product from './product.entity';
import Auction from './auction.entity';

import bcrypt from 'bcrypt';
import envConfig from '../configs/env.config';

const PASSWORD_MAX_LENGTH = 20;

export default class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare readonly id: CreationOptional<number>;
  declare email: string;
  declare password: string;
  declare birthday: string;
  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
  declare readonly deletedAt: Date | null;
  declare readonly products: NonAttribute<Product>;
  declare readonly auctions: NonAttribute<Auction>;

  async hashPassword() {
    // TODO: 이 조건 없이 최초에 hashPassword 한 번만 할 순 없을까. 
    // 생성자에 넣기에는 sequelize에서 Model 생성할 때 생성자에서 발생하는 기본 동작들을 모른다.
    if ( this.password.length > PASSWORD_MAX_LENGTH ) {
      return;
    }
    const salt = await bcrypt.genSalt( +envConfig.passwordSalt ); 
    this.password = await bcrypt.hash( this.password, salt );
  }

  async validatePassword( password: string ): Promise<boolean> {
    return await bcrypt.compare( password, this.password );
  }

  async setNewPassword( password ) {
    this.password = password;
    await this.hashPassword();
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
    validate: { isEmail: true },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { len: [ 4, PASSWORD_MAX_LENGTH ] },
  },
  birthday: {
    type: DataTypes.STRING( 8 ),
    allowNull: false,
    validate: { is: /^(19[0-9][0-9]|20\d{2})(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/ },
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
      await user.hashPassword();
    },
  },
});
