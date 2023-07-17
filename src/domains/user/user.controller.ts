import { Router } from "express";
import { respond } from "../../utils/responder";

const router = Router();

router.get( '', respond( () => {
  return { result: 'users home' };
}) );

export default router;
