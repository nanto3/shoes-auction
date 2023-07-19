import { Sequelize, Model, DataTypes } from 'sequelize';

class User extends Model {
  declare id: number; 
  declare uuid: string;
  declare email: string;
  declare password: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
  declare readonly deletedAt: Date;
}

export const UserFactory = ( sequelize: Sequelize ) => User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: false,
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
