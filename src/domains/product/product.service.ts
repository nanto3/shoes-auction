import { type ProductRepository } from './product.repository';

export class ProductService {
  constructor( private productRepository: ProductRepository ) {}

  async createProdudct( product: ProductVO ) {
    return this.productRepository.createProduct( product );
  }

  async getProductById( id: number ) {
    return await this.productRepository.findOneBy({ id });
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

