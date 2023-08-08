import { Router } from 'express';
import { handleNotFoundRoute } from '../utils/frame-util/responder';
import { getHttpMethod } from '../utils/frame-util/http-method';

import userController from './user/user.controller';
import productController from './product/product.controller';
import auctionController from './auction/auction.controller';

const router = Router(); 

userController( getHttpMethod( router, '/users' ) );
productController( getHttpMethod( router, '/products' ) );
auctionController( getHttpMethod( router, '/auctions' ) );
router.use( handleNotFoundRoute );

export default router;
