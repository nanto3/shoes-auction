import { Router } from "express";
import { respond } from "../../utils/responder";
import UserSerivce from './UserService';
import UserRepository from './UserRepository';
import User from "./User";

const router = Router();

const userService = new UserSerivce( new UserRepository() );

router.get( '', respond( async () => {
  return { result: 'users home' };
}) );

/**
 * @api 회원가입
 */
router.post( '/join', respond( async ({ body }) => {
  const { email, password } = body;

  return { user: await userService.join( new User({ email, password }) ) };
}) );

router.post( '/login', respond( async ({ body }) => {
  const { email, password } = body;
}) );

export default router;
