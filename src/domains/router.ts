import { type Router } from 'express';
import { respondNotFoundRoute } from '../utils/frame-util/responder';
import { inject3LayerDependency, routeWithControllers } from '../utils/frame-util/3-layer-helper';

import { UserController, UserService, UserRepository } from './user';
import { AuthUuid } from '../utils/AuthUuid';
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
          [ AuthUuid, await redisClient.connectRedis() ], 
        ], 
      ], 
    }) 
  );

  router.use( respondNotFoundRoute );
};

export default startRoute;
