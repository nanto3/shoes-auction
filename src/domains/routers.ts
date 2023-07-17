import { Router } from 'express';
import UserRouter from './user/user.controller';
import ProductRouter from './product/product.controller';

const router = Router();

router.use( '/users', UserRouter );
router.use( '/products', ProductRouter );

export default router;
