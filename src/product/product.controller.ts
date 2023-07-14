import { Router } from "express";
import { respond } from "../utils/controller";

const router = Router();

router.get( '', respond( () => {
  return { result: 'products home' };
}) );

export default router;