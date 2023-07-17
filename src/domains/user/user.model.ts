import { Model, DataTypes } from 'sequelize';
import sequelize from '../../configs/sequelize';

export default class User extends Model {
  declare id: number; 
  declare uuid: string;
  declare email: string;
  declare password: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
  declare readonly deletedAt: Date;
}

User.init({
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
}, { sequelize });
