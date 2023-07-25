import { Router } from "express";
import { respond } from "../../utils/responder";
import UserSerivce from './UserService';
import UserRepository from './UserRepository';
import User from "./User";
import ResException from "../../models/ResException";

import { verify } from "../../utils/jwt";

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
  const { email, password } = body;
  const { authorization } = headers;

  // TODO: proxy로 추출하기
  if ( !authorization ) {
    throw new ResException( 400, 'bad data' );
  }
  const payload = verify( authorization.replace( 'Bearer ', '' ) );
  const userUuid = payload.userUuid;
  const user = await userService.getUserByUuid( userUuid );
  if ( !user ) {
    throw new ResException( 401, 'not authenticated' );
  }
  if ( email !== user.email ) {
    throw new ResException( 401, 'wrong access' );
  }
  //

  return await userService.login( new User( email, password ) );
}) );

export default router;
