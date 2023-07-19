import { Sequelize, Model, DataTypes } from 'sequelize';

class Auction extends Model {
  declare id: number;
  declare uuid: string;
  declare productUuid: string;
  declare userUuid: string;
  declare price: number;
  declare result: boolean;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
  declare readonly deletedAt: Date;
}

// TODO: '최고 입찰가보다 적은 금액은 입찰 불가 처리' 어떻게 할 건지
export const AuctionFactory = ( sequelize: Sequelize ) => Auction.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: false,
    autoIncrement: true,
    unique: true,
    allowNull: false,
  },
  uuid: {
    comment: '입찰 uuid',
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    // unique: true,
  },
  // productUuid: {
  //   comment: '상품 uuid',
  //   type: DataTypes.STRING,
  //   primaryKey: true,
  // },
  // userUuid: {
  //   comment: '입찰자 uuid',
  //   type: DataTypes.STRING,
  //   allowNull: false,
  // },
  price: {
    comment: '입찰 가격',
    type: DataTypes.INTEGER,
    // primaryKey: true,
    allowNull: false,
  },
  result: {
    comment: '낙찰 여부',
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
  deletedAt: DataTypes.DATE,
}, {
  sequelize,
  paranoid: true,
  underscored: true,
});
