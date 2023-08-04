import { Sequelize, Model, DataTypes } from 'sequelize';

export default class Product extends Model {
}

export const ProductFactory = ( sequelize: Sequelize ) => Product.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: false,
    autoIncrement: true,
    unique: true,
    allowNull: false,
  },
  uuid: {
    comment: '상품 uuid',
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  // brand: {
  //   comment: '브랜드명',
  //   type: DataTypes.ENUM( 'NIKE', 'ADIDAS', 'NEW-BALANCE', 'ETC' ),
  //   allowNull: false,
  //   defaultValue: 'ETC',
  // },
  // name: {
  //   comment: '상품명',
  //   type: DataTypes.STRING,
  //   allowNull: false,
  // },
  // price: {
  //   comment: '상품 시작 가격',
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  //   defaultValue: 0,
  // },
  // // userUuid: {
  // //   comment: '판매자 uuid',
  // //   type: DataTypes.STRING,
  // //   allowNull: false,
  // // },
  // status: {
  //   comment: '상품 상태',
  //   type: DataTypes.ENUM( 'SELLING','WAITING','SOLD','PENDING','FAILED' ),
  //   defaultValue: 'SELLING',
  // },
  // image: {
  //   comment: '상품 이미지',
  //   type: DataTypes.STRING,
  // },
  // auctionCloseDate: {
  //   comment: '경매 마감 날짜',
  //   type: DataTypes.DATE,
  //   allowNull: false,
  // },
  // createdAt: DataTypes.DATE,
  // updatedAt: DataTypes.DATE,
  // deletedAt: DataTypes.DATE,
}, {
  sequelize,
  paranoid: true,
  underscored: true,
});
