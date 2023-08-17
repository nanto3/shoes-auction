import { type Router } from 'express';
import { respondNotFoundRoute, handleError } from '../utils/frame-util/responder';
import { inject3LayerDependency, routeWithControllers } from '../utils/frame-util/3-layer-helper';

import { UserController, UserService, UserRepository } from './user';
import { ProductController, ProductService, ProductRepository } from './product';
import { AuctionController, AuctionService, AuctionRepository } from './auction';

import jwtUtil from '../utils/jwt';
import AuthUuid from '../utils/AuthUuid';
import redisClient from '../configs/redis.config';
import JobEvent, { ProductJob } from '../jobs';
import EventEmitter from 'events';

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
          [ AuthUuid, redisClient ], 
        ], 
      ],
      products: [
        ProductController,
        [ 
          [ ProductService,ProductRepository ],
          [ JobEvent, 
            [ EventEmitter, 
              [ ProductJob, 
                [ ProductRepository, AuctionRepository ] ] ] ],
        ],
      ],
      auctions: [
        AuctionController,
        AuctionService, 
        [ AuctionRepository, ProductRepository ],
      ],
    }) 
  );

  router.use( respondNotFoundRoute );
  router.use( handleError );
};

export default startRoute;
