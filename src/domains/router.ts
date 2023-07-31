import { Router } from 'express';
import UserRouter from './user/UserController';
import ProductRouter from './product/ProductController';
import AuctionRouter from './auction/AuctionController';
import { emitNotFoundError, handleError } from '../utils/responder';

const router = Router();

router.use( '/users', UserRouter );
router.use( '/products', ProductRouter );
router.use( '/auctions', AuctionRouter );

router.use( emitNotFoundError );
router.use( handleError );

export default router;
