import { Router } from 'express';
import { respondNotFoundRoute } from '../utils/frame-util/responder';
import { injectDependency, matchRouteWithControllers } from '../utils/frame-util/3-layer-helper';

import { UserController, UserService, UserRepository } from './user';

const router = Router();

matchRouteWithControllers( 
  router,
  injectDependency({ users: [ UserController, UserService, UserRepository ] }) 
);

router.use( respondNotFoundRoute );

export default router;
