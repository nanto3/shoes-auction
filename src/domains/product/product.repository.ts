import { Transaction, Attributes, CreationAttributes } from 'sequelize';
import { Product } from "../../entities";
import ErrorException from '../../utils/ErrorException';

export class ProductRepository {
  
  async createProduct( product: CreationAttributes<Product>, transaction?: Transaction ) {
    return await Product.create( product, { transaction });
  }

  async findOneBy<T extends keyof Attributes<Product>>( where: Record<T, Product[T]>, transaction?: Transaction ) {
    return await Product.findOne({ where, transaction });
  }

  async findAndCountAll<T extends keyof Attributes<Product>>(
    { page, limit }: PaginationOptions, 
    where?: Record<T, Product[T]>, 
    transaction?: Transaction 
  ) {
    if ( where instanceof Transaction ) {
      transaction = where;
      where = null;
    }

    limit = limit || 20;
    page = page || 1;
    const offset = ( page - 1 ) * limit;
    
    const { count, rows: products } = await Product.findAndCountAll({ where, offset, limit, transaction });

    return { count, products };
  }
}

export interface PaginationOptions {
  page: number;
  limit: number;
}
