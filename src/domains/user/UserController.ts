import { Router } from "express";
import { respond } from "../../utils/responder";
import UserSerivce from './UserService';
import UserRepository from './UserRepository';
import User from "./User";
import ResException from "../../models/ResException";

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

  return { user: await userService.join( new User( email, password ) ) };
}) );

router.post( '/login', respond( async ({ headers, body }) => {
  const userUuid = headers.useruuid as string;
  const { email, password } = body;

  // TODO: proxy로 추출하기
  const user = await userService.getUserByUuid( userUuid );
  if ( email !== user.email ) {
    throw new ResException( 401, 'not authenticated' );
  }

  return await userService.login( new User( email, password ) );
}) );

export default router;
