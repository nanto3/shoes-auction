import { Router } from 'express';
import ProductRouter from './domains/product/product.controller';

const router = Router();

router.use( '/products', ProductRouter );

export default router;
