import { type ProductService } from "./product.service";
import { Get, Post, Patch } from "../../utils/frame-util/3-layer-helper";
import { excptIfNotType } from "../../utils/ErrorException";

export class ProductController {
  constructor( private productService: ProductService ) {}

  테스트 = Get( '' )
  ( () => {
    return { result: 'product home' };
  });
}
