import { Router } from "express";
import { respond } from "../../utils/responder";
import UserSerivce from './UserService';
import UserRepository from './UserRepository';
import User from "./User";
import { EXPIRY_OF_ACCESS_TOKEN_BY_SECOND, EXPIRY_OF_REFRESH_TOKEN_BY_SECOND } from "../../utils/jwt";
import { ONE_SECOND_BY_MILLI } from '../../constants/const';
import * as STRING_CONST from '../../constants/string';

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

router.post( '/login', respond( async ({ body }, { setCookie }) => {
  const { email, password } = body;

  const { accessToken, refreshToken, userUuid } = await userService.login( new User( email, password ) );

  setCookie( STRING_CONST.Authorization, `${STRING_CONST.Bearer} ${accessToken}`, { maxAge: EXPIRY_OF_ACCESS_TOKEN_BY_SECOND * ONE_SECOND_BY_MILLI }
  );
  setCookie( STRING_CONST.refreshtoken, refreshToken, { maxAge: EXPIRY_OF_REFRESH_TOKEN_BY_SECOND * ONE_SECOND_BY_MILLI });
  
  return { email, userUuid }; 
}) );

export default router;
