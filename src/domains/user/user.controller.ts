import { Router } from "express";
import { respond } from "../../utils/responder";
import UserSerivce from './user.service';
import * as UserRepository from './user.repository';

const router = Router();

const userService = new UserSerivce( UserRepository );

router.get( '', respond( () => {
  return { result: 'users home' };
}) );

/**
 * @api 회원가입
 */
router.get( '/join', respond( async ({ body }) => {
  const { email, password } = body;

  return { user: await userService.join({ email, password }) };
}) );

export default router;
