import { Router } from "express";
import { respond } from "../../utils/responder";
import UserSerivce from './UserService';
import UserRepository from './UserRepository';
import { excptIfNotType } from "../../utils/ResException";
import { EXPIRY_OF_ACCESS_TOKEN_BY_SECOND, EXPIRY_OF_REFRESH_TOKEN_BY_SECOND } from "../../utils/jwt";
import User from "../../entities/UserEntity";

const router = Router();

const userService = new UserSerivce( new UserRepository() );

router.get( '', respond( async () => {

  const user = new User({ email: 'foo@test.com', password: '1234  ' });
  console.log( user );

  return { result: 'users home' };
}) );

/**
 * @api 회원가입
 */
router.post( '/join', respond( async ({ body }) => {
  const { email, password } = body;
  excptIfNotType( 'string', email, password );

  return { user: await userService.join( email, password ) };
}) );

/**
 * @api 로그인
 */
router.post( '/login', respond( async ({ body }, { setCookie }) => {
  const { email, password } = body;
  excptIfNotType( 'string', email, password );

  const { accessToken, refreshToken, userUuid } = await userService.login( email, password );

  setCookie( 'Authorization', `Bearer ${accessToken}`, { maxAge: EXPIRY_OF_ACCESS_TOKEN_BY_SECOND * 1000 }
  );
  setCookie( 'refreshtoken', refreshToken, { maxAge: EXPIRY_OF_REFRESH_TOKEN_BY_SECOND * 1000 });
  
  return { email, userUuid }; 
}) );

export default router;
