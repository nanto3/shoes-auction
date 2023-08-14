import { type AuctionService } from "./auction.service";
import { Get, Post, Patch } from "../../utils/frame-util/3-layer-helper";
import { excptIfNotType } from "../../utils/ErrorException";

export class AuctionController {
  constructor( private auctionService: AuctionService ) {}

  테스트 = Get( '' )
  ( () => {
    return { result: 'auction home' };
  });
}
