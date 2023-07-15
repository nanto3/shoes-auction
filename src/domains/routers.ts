import { Router } from 'express';
import ProductRouter from './product/product.controller';

const router = Router();

router.use( '/products', ProductRouter );

export default router;
