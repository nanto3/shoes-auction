import { Router } from 'express';
import UserRouter from './user/UserController';
import ProductRouter from './product/ProductController';
import AuctionRouter from './auction/AuctionController';

const router = Router();

router.use( '/users', UserRouter );
router.use( '/products', ProductRouter );
router.use( '/auctions', AuctionRouter );

export default router;
