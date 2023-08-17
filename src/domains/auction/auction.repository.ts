import { Attributes, IncludeOptions, Transaction } from 'sequelize';
import { Auction, Product } from "../../entities";

export class AuctionRepository {

  async save( auction: Auction, transaction?: Transaction ) {
    return await auction.save({ transaction });
  }

  async update<T extends keyof Attributes<Auction>, K extends keyof Attributes<Auction>>( body: Record<T, Auction[T]>, { where, transaction }: UpdateOptions<K>={}) {
    const result = await Auction.update( body, { where, transaction });
    
    return result[0];
  }
  
  async findOneBy<T extends keyof Attributes<Auction>>( 
    where: Record<T, Auction[T]>, { order, withProduct, transaction }: FindOneByOptions={}) {
    const include: IncludeOptions = withProduct ? { model: Product, as: 'product' } : null;

    return await Auction.findOne({ where, order, include, transaction });
  }
}

interface UpdateOptions<T extends keyof Attributes<Auction>> {
  where?: Record<T, any>;
  transaction?: Transaction;
}
interface FindOneByOptions {
  transaction?: Transaction;
  withProduct?: boolean;
  order?: [string, string][]
}
