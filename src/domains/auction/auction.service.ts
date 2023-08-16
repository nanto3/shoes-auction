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
      this.auctionRepository.findOneBy({ productId }, { order: [ 'bidPrice', 'desc' ] }), 
      this.ProductRepository.findOneBy({ id: productId }), 
    ]);
    
    excptIfFalsy( product, 'product not exist' );
    
    const topBidPrice = auctionInDb?.bidPrice || ( product.price - 1 );
    const auction = new Auction({ userId, productId, bidPrice, createdAt: nowDate });
    
    excptIfFalsy( auction.checkCloseDate( product.auctionCloseDate ), 'auction closed' );
    excptIfFalsy( auction.userId !== product.userId, `can't bid for own product` );
    excptIfFalsy( auction.bidPrice > topBidPrice, 'bidPrice should be larger than last bidPrice' );

    // TODO: '최고 입찰가보다 적은 금액은 입찰 불가 처리' 어떻게 할 건지. 
    // db에 같은 금액 입력될 수 있다.
    
    return await this.auctionRepository.save( auction );
  }
}

interface auctionVO {
  userId: number;
  productId: number;
  bidPrice: number;
  nowDate: Date;
}
