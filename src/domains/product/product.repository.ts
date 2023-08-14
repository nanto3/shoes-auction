import { Transaction, Attributes, CreationAttributes } from 'sequelize';
import Product from "../../entities/product.entity";
import ErrorException from '../../utils/ErrorException';

export class ProductRepository {
  
  async createProduct( product: CreationAttributes<Product>, transaction?: Transaction ) {
    return await Product.create( product );
  }

  async findOneBy<T extends keyof Attributes<Product>>( where: Record<T, Product[T]>, transaction?: Transaction ) {
    return await Product.findOne({ where, transaction });
  }
}
