import { Router } from "express";
import { respond } from "../../utils/responder";
import UserSerivce from './user.service';
import UserRepository from './user.repository';
import UserUtil from "../../models/UserUtil";

const router = Router();

const userService = new UserSerivce( new UserRepository() );

router.get( '', respond( () => {
  return { result: 'users home' };
}) );

/**
 * @api 회원가입
 */
router.get( '/join', respond( async ({ body }) => {
  const { email, password } = body;

  return {
    user: await userService.join({ 
      email, 
      password: await UserUtil.hashPassword( password ), 
    }), 
  };
}) );

export default router;
