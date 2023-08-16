import { type AuctionService } from "./auction.service";
import { Get, Post, Patch } from "../../utils/frame-util/3-layer-helper";
import { excptIfNotType } from "../../utils/ErrorException";
import jwtUtil from "../../utils/jwt";

// middleware 처리
const validateUser = ( req, _, next ) => {
  const { authorization } = req.headers;
  const accessToken = authorization.replace( 'Bearer ', '' );

  const result = jwtUtil.verify( accessToken );
  req.body.userId = result.userId;

  next();
};

export class AuctionController {
  constructor( private auctionService: AuctionService ) {}

  테스트 = Get( '' )
  ( () => {
    return { result: 'auction home' };
  });

  입찰하기 = Post( '', validateUser )
  ( async ({ body }) => {
    const { userId, productId, bidPrice } = body;
    excptIfNotType( 'number', userId, productId, bidPrice );
    
    const auction = await this.auctionService.bid({ userId, productId, bidPrice, nowDate: new Date() });

    // 이벤트 발생시키기

    return { auction }; 
  });
}
