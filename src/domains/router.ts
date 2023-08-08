import { Express } from 'express';
import { handleNotFoundRoute } from '../utils/responder';
import { getHttpMethods } from '../utils/http-method';

import userController from './user/user.controller';
import productController from './product/product.controller';
import auctionController from './auction/auction.controller';

const router = ( app: Express ) => {
  userController( getHttpMethods( app, '/users' ) );
  productController( getHttpMethods( app, '/products' ) );
  auctionController( getHttpMethods( app, '/auctions' ) );

  app.use( handleNotFoundRoute );
};

export default router;

