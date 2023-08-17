import { type AuctionRepository } from "./auction.repository";
import { type ProductRepository } from './../product/product.repository';
import { excptIfFalsy } from "../../utils/ErrorException";
import { Auction } from "../../entities";

export class AuctionService {
  constructor( 
    private auctionRepository: AuctionRepository, 
    private ProductRepository: ProductRepository 
  ) {}

  async bid({ userId, productId, bidPrice, nowDate }: auctionVO ) {
    const [ auctionInDb, product ] = await Promise.all([ 
      this.auctionRepository.findOneBy({ productId }, { order: [ [ 'bidPrice', 'desc' ] ] }), 
      this.ProductRepository.findOneBy({ id: productId }), 
    ]);
    
    excptIfFalsy( product, 'product not exist' );
    
    const topBidPrice = auctionInDb?.bidPrice || ( product.price - 1 );
    const auction = new Auction({ userId, productId, bidPrice, createdAt: nowDate });
    
    excptIfFalsy( auction.checkCloseDate( product.auctionCloseDate ), 'auction closed' );
    excptIfFalsy( auction.userId !== product.userId, `can't bid for own product` );
    excptIfFalsy( auction.bidPrice > topBidPrice, 'bidPrice should be larger than last bidPrice' );
    
    return await this.auctionRepository.save( auction );
  }
}

interface auctionVO {
  userId: number;
  productId: number;
  bidPrice: number;
  nowDate: Date;
}
