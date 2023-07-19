import { Router } from 'express';
import UserRouter from './user/user.controller';
import ProductRouter from './product/product.controller';
import AuctionRouter from './auction/auction.controller';

const router = Router();

router.use( '/users', UserRouter );
router.use( '/products', ProductRouter );
router.use( '/auctions', AuctionRouter );

export default router;
