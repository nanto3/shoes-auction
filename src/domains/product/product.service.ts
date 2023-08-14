import { type ProductRepository } from './product.repository';

export class ProductService {
  constructor( private productRepository: ProductRepository ) {}

  async getProductById( id: number ) {
    return await this.productRepository.findOneBy({ id });
  }
}
