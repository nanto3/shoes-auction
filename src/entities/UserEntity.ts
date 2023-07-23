import { Sequelize, Model, DataTypes, CreationOptional, NonAttribute, InferAttributes, InferCreationAttributes } from 'sequelize';

export default class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>; 
  declare uuid: CreationOptional<string>;
  declare email: string;
  declare password: string;
  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
  declare readonly deletedAt: Date | null;
  declare products: NonAttribute<Record<string, any>[]>;
  declare auctions: NonAttribute<Record<string, any>[]>;
}

export const UserFactory = ( sequelize: Sequelize ) => User.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    unique: true,
    allowNull: false,
  },    
  uuid: {
    comment: '유저 uuid',
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  email: {
    comment: '유저 mail',
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    comment: '비밀번호',
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
});

