import { Router } from "express";
import { respond } from "../../utils/responder";
import UserSerivce from './UserService';
import UserRepository from './UserRepository';
import UserUtil from "../../models/UserUtil";
import User from './User';

const router = Router();

const userService = new UserSerivce( new UserRepository() );

router.get( '', respond( () => {
  const user = new User({ email: 'jsu7375@gmail.com', password: '1234' });
  user.email = 'hihih';
  console.log( user );
  return { result: 'users home' };
}) );

/**
 * @api 회원가입
 */
router.get( '/join', respond( async ({ body }) => {
  const { email, password } = body;
  const hashedPassword = await UserUtil.hashPassword( password );

  return {
    user: await userService.join({
      email, 
      password: hashedPassword, 
    }), 
  };
}) );

export default router;
