import { Express } from 'express';
import { handleNotFoundRoute } from '../utils/frame-util/responder';
import { getHttpMethod } from '../utils/frame-util/http-method';

import userController from './user/user.controller';
import productController from './product/product.controller';
import auctionController from './auction/auction.controller';

const router = ( app: Express ) => {
  userController( getHttpMethod( app, '/users' ) );
  productController( getHttpMethod( app, '/products' ) );
  auctionController( getHttpMethod( app, '/auctions' ) );

  app.use( handleNotFoundRoute );
};

export default router;

