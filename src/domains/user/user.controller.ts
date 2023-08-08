import UserService from "./user.service";
import { excptIfNotType } from "../../utils/error-exception";
import { EXPIRY_OF_ACCESS_TOKEN_BY_SECOND, EXPIRY_OF_REFRESH_TOKEN_BY_SECOND } from "../../utils/jwt";

const userController = (
  { get, post, patch, put, destroy }, 
  userService=new UserService() ) => {
  
  get( '' )
  ( async () => {
    return { result: 'user home' };
  });

  post( '/join' )
  ( async ({ body }) => {
    const { email, password } = body;
    excptIfNotType( 'string', email, password );

    return { user: await userService.join( email, password ) };
  });

  post( '/login' )
  ( async ({ body }, { setCookie }) => {
    const { email, password } = body;
    excptIfNotType( 'string', email, password );

    const { accessToken, refreshToken, userUuid } = await userService.login( email, password );

    setCookie( 'Authorization', `Bearer ${accessToken}`, { maxAge: EXPIRY_OF_ACCESS_TOKEN_BY_SECOND * 1000 }
    );
    setCookie( 'refreshtoken', refreshToken, { maxAge: EXPIRY_OF_REFRESH_TOKEN_BY_SECOND * 1000 });
  
    return { email, userUuid }; 
  });
};

export default userController;
