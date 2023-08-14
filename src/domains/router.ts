import { type Router } from 'express';
import { respondNotFoundRoute } from '../utils/frame-util/responder';
import { inject3LayerDependency, routeWithControllers } from '../utils/frame-util/3-layer-helper';

import { UserController, UserService, UserRepository } from './user';
import { ProductController, ProductService, ProductRepository } from './product';
import { AuctionController, AuctionService, AuctionRepository } from './auction';
import jwtUtil from '../utils/jwt';
import AuthUuid from '../utils/AuthUuid';
import redisClient from '../configs/redis.config';

const startRoute = async ( router: Router ) => {
  routeWithControllers( 
    router,
    inject3LayerDependency({
      users: [ 
        UserController, 
        UserService, 
        [ 
          UserRepository,
          jwtUtil, 
          [ AuthUuid, await redisClient.connectRedis() ], 
        ], 
      ],
      products: [
        ProductController,
        ProductService,
        ProductRepository,
      ],
      auctions: [
        AuctionController,
        AuctionService,
        AuctionRepository,
      ],
    }) 
  );

  router.use( respondNotFoundRoute );
};

export default startRoute;
