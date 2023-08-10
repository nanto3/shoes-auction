import { type UserService } from "./user.service";
import { Get, Post, Patch } from "../../utils/frame-util/3-layer-helper";
import { excptIfNotType } from "../../utils/error-exception";
import { EXPIRY_OF_ACCESS_TOKEN_BY_SECOND, EXPIRY_OF_REFRESH_TOKEN_BY_SECOND } from "../../utils/jwt";

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

    return { user: await this.userService.join( email, password, birthday ) };
  });

  로그인 = Post( '/loign' )
  ( async ({ body }, { setCookie }) => {
    const { email, password } = body;
    excptIfNotType( 'string', email, password );

    const { accessToken, refreshToken, userUuid } = await this.userService.login( email, password );

    setCookie( 'Authorization', `Bearer ${accessToken}`, { maxAge: EXPIRY_OF_ACCESS_TOKEN_BY_SECOND * 1000 }
    );
    setCookie( 'refreshtoken', refreshToken, { maxAge: EXPIRY_OF_REFRESH_TOKEN_BY_SECOND * 1000 });
  
    return { email, userUuid }; 
  });

  메일_생일_일치_회원_유무 = Post( '/email-birthday' )
  ( async ({ body }) => {
    const { email, birthday } = body;
    excptIfNotType( 'string', email, birthday );

    return { findMatched: !!( await this.userService.getUserByEmailAndBirthday({ email, birthday }) ) };
  });

  비밀번호_변경 = Patch( '/password' )
  ( async ({ body }) => {
    const { email, birthday, password } = body;
    excptIfNotType( 'string', email, birthday, password );

    return { user: await this.userService.getUserWithNewPassword({ email, birthday, password }) };
  });
}
