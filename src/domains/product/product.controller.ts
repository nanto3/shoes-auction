import { type ProductService } from "./product.service";
import { Get, Post, Patch } from "../../utils/frame-util/3-layer-helper";
import { excptIfNotType } from "../../utils/ErrorException";

export class ProductController {
  constructor( private productService: ProductService ) {}

  테스트 = Get( '' )
  ( () => {
    return { result: 'product home' };
  });

  상품_등록 = Post( '' )
  ( async ({ body }) => {
    const { userId, brand, name, price, image, auctionCloseDate } = body;
    excptIfNotType( 'string', brand, name, image, auctionCloseDate );
    excptIfNotType( 'number', userId, price );

    return {};
  });
}
