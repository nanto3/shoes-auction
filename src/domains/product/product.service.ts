import { type ProductRepository, PaginationOptions } from './product.repository';
import { Product, Auction } from '../../entities';
import { Op } from 'sequelize';

export class ProductService {
  constructor( private productRepository: ProductRepository ) {}

  async createProdudct( product: ProductDTO ) {
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

  // TODO: 내부에서 repository 사용하지 않고 모델을 사용하고 있는데 repository 사용하도록 변경
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
      
      const jsoned: any = product.toJSON();
      jsoned.topAuction = topAuction;
      jsoned.myAuction = myAuction;
      delete jsoned.auctions;

      return jsoned;
    });

    return { products: myBinddingProducts, count: myBinddingProducts.length };
  }

  // TODO: 내부에서 repository 사용하지 않고 모델을 사용하고 있는데 repository 사용하도록 변경
  async getMySellingProductsAndCount( userId: number, { page, limit, brand }: ProductListOptions ) {
    const { rows: mySellingProductsAndAuctions } = await Product.findAndCountAll({
      where: { userId, status: 'SELLING', ...( brand && { brand }) }, 
      include: { model: Auction, as: 'auctions' },
      order: [ [ 'auctions', 'id', 'desc' ] ],
      offset: ( page - 1 ) * limit, 
      limit, 
    });

    const mySellingProducts = mySellingProductsAndAuctions.map( product => {
      const jsoned: any = product.toJSON();

      const participantIdObj = jsoned.auctions
        .reduce( ( acc: Record<number, number>, auction: Auction ) => acc[auction.userId] ? 
          acc : 
          ( acc[auction.userId] = 1, acc ), {});

      jsoned.participantCount = Object.keys( participantIdObj ).length;
      jsoned.auctionCount = jsoned.auctions.length;
      jsoned.topAuction = jsoned.auctions[0] || null;
      delete jsoned.auctions;

      return jsoned;
    });

    return { products: mySellingProducts, count: mySellingProducts.length };
  }
}

interface ProductDTO {
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
