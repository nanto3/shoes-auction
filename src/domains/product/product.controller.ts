import { type ProductService } from "./product.service";
import { Get, Post, Patch } from "../../utils/frame-util/3-layer-helper";
import { excptIfNotType } from "../../utils/ErrorException";

export class ProductController {
  constructor( private productService: ProductService ) {}

  상품_조회 = Get( '' )
  ( async ({ query }) => {
    const { page, limit, brand } = query;

    return await this.productService.getProducts({ 
      page: +page, 
      limit: +limit,
      brand: brand as 'NIKE'|'ADIDAS'|'ETC',
    });
  });

  상품_등록 = Post( '' )
  ( async ({ body }) => {
    const { userId, brand, name, price, image, auctionCloseDate } = body;
    excptIfNotType( 'string', brand, name, image, auctionCloseDate );
    excptIfNotType( 'number', userId, price );

    return { product: this.productService.createProdudct({ userId, brand, name, price, image, auctionCloseDate }) };
  });
}
