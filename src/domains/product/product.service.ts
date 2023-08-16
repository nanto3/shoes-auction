import { type ProductRepository, PaginationOptions } from './product.repository';
import { Product } from '../../entities';

export class ProductService {
  constructor( private productRepository: ProductRepository ) {}

  async createProdudct( product: ProductVO ) {
    return this.productRepository.createProduct( product );
  }

  async getProducts({ page, limit, brand }: ProductListOptions ) {
    return this.productRepository.findAndCountAll(
      { page, limit }, 
      brand && { brand }
    );
  }

  async getProductById( id: number ) {
    return await this.productRepository.findOneBy({ id });
  }

  async getProductWithAuctions( id: number ) {
    return await this.productRepository.findOneBy({ id }, { includeAuctions: true });
  }
}

interface ProductVO {
  userId: number;
  brand: 'NIKE'|'ADIDAS'|'ETC';
  name: string;
  price: number;
  image?: string | null;
  auctionCloseDate: Date;
}
interface ProductListOptions extends PaginationOptions {
  brand: 'NIKE'|'ADIDAS'|'ETC';
}
