import { Router } from 'express';
import { respondNotFoundRoute } from '../utils/frame-util/responder';
import injectDependencies from '../utils/frame-util/dependency-injector';

import userController from './user/user.controller';
import UserService from './user/user.service';
import UserRepository from './user/user.repository';

import productController from './product/product.controller';
import auctionController from './auction/auction.controller';
import HttpMethod from '../utils/frame-util/http-method';

const router = Router();

injectDependencies( HttpMethod( router ), { users: [ userController, UserService, UserRepository ] });

router.use( respondNotFoundRoute );

export default router;
