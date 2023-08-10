import { type Router } from 'express';
import { respondNotFoundRoute } from '../utils/frame-util/responder';
import { injectDependency, matchRouteWithControllers } from '../utils/frame-util/3-layer-helper';
import redisClient from '../configs/redis.config';

import { UserController, UserService, UserRepository } from './user';

const startRoute = async ( router: Router ) => {
  matchRouteWithControllers( 
    router,
    injectDependency({ users: [ UserController, UserService, [ UserRepository, await redisClient.connectRedis() ] ] }) 
  );

  router.use( respondNotFoundRoute );
};




export default startRoute;
