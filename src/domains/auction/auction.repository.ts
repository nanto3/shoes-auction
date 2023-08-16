import { Attributes, IncludeOptions, Transaction } from 'sequelize';
import { Auction, Product } from "../../entities";

export class AuctionRepository {

  async save( auction: Auction, transaction?: Transaction ) {
    return await auction.save({ transaction });
  }
  
  async findOneBy<T extends keyof Attributes<Auction>>( 
    where: Record<T, Auction[T]>, { order, withProduct, transaction }: FindOneByOptions={}) {
    const include: IncludeOptions = withProduct ? { model: Product, as: 'product' } : null;

    return await Auction.findOne({ where, order, include, transaction });
  }
}

interface FindOneByOptions {
  transaction?: Transaction;
  withProduct?: boolean;
  order?: [string, string]
}
