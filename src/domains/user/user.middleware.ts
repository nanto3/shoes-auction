import { Request } from "express";
import ErrorException from "../../utils/ErrorException";
import jwtUtil from "../../utils/jwt";

export const verifyUserWithJwt = ( req: Request ) => {
  const { authorization } = req.headers;

  if ( !authorization ) {
    throw new ErrorException( 403, 'forbidden' );
  }

  const accessToken = authorization.replace( 'Bearer ', '' );
  const result = jwtUtil.verify( accessToken );
  
  req.headers.userId = result.userId;
};
