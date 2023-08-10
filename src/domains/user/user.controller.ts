import { type UserService } from "./user.service";
import { Get, Post } from "../../utils/frame-util/3-layer-helper";
import { excptIfNotType } from "../../utils/error-exception";
import { EXPIRY_OF_ACCESS_TOKEN_BY_SECOND, EXPIRY_OF_REFRESH_TOKEN_BY_SECOND } from "../../utils/jwt";

export class UserController {
  constructor( private userService: UserService ) {}

  getHome = Get( '' )
  ( () => {
    return { result: 'user home' };
  });

  join = Post( '/join' )
  ( async ({ body }) => {
    const { email, password, birthday } = body;
    excptIfNotType( 'string', email, password, birthday );

    return { user: await this.userService.join( email, password, birthday ) };
  });

  login = Post( '/loign' )
  ( async ({ body }, { setCookie }) => {
    const { email, password } = body;
    excptIfNotType( 'string', email, password );

    const { accessToken, refreshToken, userUuid } = await this.userService.login( email, password );

    setCookie( 'Authorization', `Bearer ${accessToken}`, { maxAge: EXPIRY_OF_ACCESS_TOKEN_BY_SECOND * 1000 }
    );
    setCookie( 'refreshtoken', refreshToken, { maxAge: EXPIRY_OF_REFRESH_TOKEN_BY_SECOND * 1000 });
  
    return { email, userUuid }; 
  });
}
