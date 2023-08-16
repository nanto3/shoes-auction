import { type ProductService } from "./product.service";
import { Get, Post, Patch } from "../../utils/frame-util/3-layer-helper";
import { excptIfNotType, excptIfFalsy } from "../../utils/ErrorException";

export class ProductController {
  constructor( private productService: ProductService ) {}

  상품_등록 = Post( '' )
  ( async ( req ) => {
    const { userId, brand, name, price, image, auctionCloseDate } = req.body;
    excptIfNotType( 'string', name, image, auctionCloseDate );
    excptIfNotType( 'number', userId, price );
    excptIfFalsy([ 'NIKE','ADIDAS','ETC' ].some( elem => elem === brand ) );

    return { product: await this.productService.createProdudct({ userId, brand, name, price, image, auctionCloseDate }) };
  });

  상품_목록_조회 = Get( '' )
  ( async ({ query }) => {
    const { page, limit, brand } = query;
    brand && excptIfFalsy([ 'NIKE','ADIDAS','ETC' ].some( elem => elem === brand ) );

    return await this.productService.getProducts({ 
      page: +page, 
      limit: +limit,
      brand: brand as 'NIKE'|'ADIDAS'|'ETC',
    });
  });

  상품_조회 = Get( '/:id' )
  ( async ({ params }) => {
    const { id } = params;
    
    return { product: await this.productService.getProductWithAuctions( +id ) };
  });
}
