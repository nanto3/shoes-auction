import { type ProductRepository, PaginationOptions } from './product.repository';
import { Product, Auction } from '../../entities';
import { Op } from 'sequelize';

export class ProductService {
  constructor( private productRepository: ProductRepository ) {}

  async createProdudct( product: ProductVO ) {
    return this.productRepository.createProduct( product );
  }

  async getSellingProductsAndCount({ page, limit, brand }: ProductListOptions ) {
    return this.productRepository.findAndCountAll(
      { page, limit }, 
      { status: 'SELLING', ...( brand && { brand }) }
    );
  }

  async getProductById( id: number ) {
    return await this.productRepository.findOneBy({ id });
  }

  async getProductWithAuctions( id: number ) {
    return await this.productRepository.findOneBy({ id }, { includeAuctions: true });
  }

  async getMyBiddingProductsAndCount( userId: number, { page, limit, brand }: ProductListOptions ) {
    const { rows: myBiddingProductsWithMyAuctions } = await Product.findAndCountAll({
      where: { ...( brand && { brand }) },
      include: {
        model: Auction, as: 'auctions', 
        where: { userId: { [Op.in]: [ userId ] } }, 
      }, 
      order: [ [ 'auctions', 'id', 'desc' ] ],
      offset: ( page - 1 ) * limit, 
      limit, 
    });

    const myBiddingProductIds = myBiddingProductsWithMyAuctions.map( product => product.id );

    const { rows: myBiddingProductsWithAllAuctions } = await Product.findAndCountAll({ 
      where: { id: { [Op.in]: myBiddingProductIds } },
      include: { model: Auction, as: 'auctions' }, 
      order: [ [ 'auctions', 'id', 'desc' ] ], 
    });

    const myBinddingProducts = myBiddingProductsWithAllAuctions.map( product => {
      const topAuction = product.auctions[0];
      const myAuction = product.findMyAuction( userId );
      
      const parsed: any = product.toJSON();
      parsed.topAuction = topAuction;
      parsed.myAuction = myAuction;
      delete parsed.auctions;

      return parsed;
    });

    return { products: myBinddingProducts, count: myBinddingProducts.length };
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
