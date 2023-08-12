import { type Router } from 'express';
import { respondNotFoundRoute } from '../utils/frame-util/responder';
import { injectDependency, routeWithControllers } from '../utils/frame-util/3-layer-helper';
import redisClient from '../configs/redis.config';

import { UserController, UserService, UserRepository } from './user';

const startRoute = async ( router: Router ) => {
  routeWithControllers( 
    router,
    injectDependency({ users: [ UserController, UserService, [ UserRepository, await redisClient.connectRedis() ] ] }) 
  );

  router.use( respondNotFoundRoute );
};

export default startRoute;
