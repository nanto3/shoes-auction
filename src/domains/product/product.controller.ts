import { type ProductService } from "./product.service";
import type JobEvent from "../../jobs";
import { Get, Post, Patch } from "../../utils/frame-util/3-layer-helper";
import { excptIfNotType, excptIfFalsy } from "../../utils/ErrorException";
import { verifyUserWithJwt } from "../user/user.middleware";

export class ProductController {
  constructor( 
    private productService: ProductService, 
    private jobEvent: JobEvent ) {}

  상품_등록 = Post( '' )
  ( async ( req ) => {
    const { userId, brand, name, price, image, auctionCloseDate } = req.body;
    excptIfNotType( 'string', name, image, auctionCloseDate );
    excptIfNotType( 'number', userId, price );
    excptIfFalsy([ 'NIKE','ADIDAS','ETC' ].some( elem => elem === brand ) );
    excptIfFalsy( new Date() < new Date( auctionCloseDate ) );

    const product = await this.productService.createProdudct({ userId, brand, name, price, image, auctionCloseDate });

    this.jobEvent.scheduleAuctionClose( product.id, product.auctionCloseDate );

    return { product: product };
  });

  상품_목록_조회 = Get( '' )
  ( async ({ query }) => {
    const { page, limit, brand } = query;
    brand && excptIfFalsy([ 'NIKE','ADIDAS','ETC' ].some( elem => elem === brand ) );

    return await this.productService.getSellingProductsAndCount({ 
      page: +page, 
      limit: +limit,
      brand: brand as 'NIKE'|'ADIDAS'|'ETC',
    });
  });

  // verifyUserWithJwt
  구매_입찰_현황_조회 = Get( '/bidding' )
  ( async ({ headers, query }) => {
    const { userid: userId } = headers;
    const { page, limit, brand } = query;
    
    brand && excptIfFalsy([ 'NIKE','ADIDAS','ETC' ].some( elem => elem === brand ) );

    return await this.productService.getMyBiddingProductsAndCount( +userId, {
      page: +page || 1,
      limit: +limit || 20,
      brand: brand as 'NIKE' | 'ADIDAS' | 'ETC',
    });
  });

  상품_조회 = Get( '/:id' )
  ( async ({ params }) => {
    const { id } = params;
    
    return { product: await this.productService.getProductWithAuctions( +id ) };
  });
}
