import { Request } from "express";
import ErrorException from "../../utils/ErrorException";
import jwtUtil from "../../utils/jwt";

export const verifyUserWithJwt = ( req: Request ) => {
  const authorization = req.cookies['authorization'];

  if ( !authorization ) {
    throw new ErrorException( 401, 'not authenticated' );
  }

  const accessToken = authorization.replace( 'Bearer ', '' );
  const result = jwtUtil.verify( accessToken );
  
  req.headers.userId = result.userId;
};
