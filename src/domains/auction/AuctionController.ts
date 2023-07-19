import { Router } from "express";
import { respond } from "../../utils/responder";

const router = Router();

router.get( '', respond( () => {
  return { result: 'auctions home' };
}) );

export default router;
