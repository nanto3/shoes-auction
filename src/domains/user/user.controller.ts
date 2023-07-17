import { Router } from "express";
import { respond } from "../../utils/responder";
import './user.service';

const router = Router();

router.get( '', respond( () => {
  return { result: 'users home' };
}) );

export default router;
