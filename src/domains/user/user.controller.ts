import { type UserService } from "./user.service";
import { Get, Post, Patch } from "../../utils/frame-util/3-layer-helper";
import { excptIfNotType, excptIfFalsy } from "../../utils/ErrorException";
import { EXPIRY_OF_ACCESS_TOKEN_BY_SECOND, EXPIRY_OF_REFRESH_TOKEN_BY_SECOND } from "../../utils/jwt";
import { EMAIL_REGEX, BIRTHDAY_REGEX } from "../../constants/const";

export class UserController {
  constructor( private userService: UserService ) {}

  테스트 = Get( '' )
  ( () => {
    return { result: 'user home' };
  });

  회원가입 = Post( '/join' )
  ( async ({ body }) => {
    const { email, password, birthday } = body;
    excptIfNotType( 'string', email, password, birthday );
    excptIfFalsy( EMAIL_REGEX.test( email ) );
    excptIfFalsy( BIRTHDAY_REGEX.test( birthday ) );
    excptIfFalsy( ( password.length >= 4 ) && ( password.length < 20 ) );

    return { user: await this.userService.join({ email, password, birthday }) };
  });

  로그인 = Post( '/login' )
  ( async ({ body }, { setCookie }) => {
    const { email, password } = body;
    excptIfNotType( 'string', email, password );

    const { accessToken, refreshToken, userId } = await this.userService.login( email, password );

    setCookie( 'Authorization', `Bearer ${accessToken}`, { maxAge: EXPIRY_OF_ACCESS_TOKEN_BY_SECOND * 1000 }
    );
    setCookie( 'refreshtoken', refreshToken, { maxAge: EXPIRY_OF_REFRESH_TOKEN_BY_SECOND * 1000 });
  
    return { email, userId }; 
  });

  비밀번호_변경_위한_유저정보_체크 = Post( '/check-user-info' )
  ( async ({ body }) => {
    const { email, birthday } = body;
    excptIfNotType( 'string', email, birthday );

    return { authUuid: await this.userService.createUuid({ email, birthday }) };
  });

  비밀번호_변경 = Patch( '/password' )
  ( async ({ body }) => {
    const { email, authUuid, password } = body;
    excptIfNotType( 'string', email, authUuid, password );

    return { result: await this.userService.changePassword({ email, authUuid, password }) };
  });
}
