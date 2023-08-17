import { Request } from "express";
import ErrorException from "../../utils/ErrorException";
import jwtUtil from "../../utils/jwt";

export const verifyUserWithJwt = ( req: Request ) => {
  const { authorization } = req.headers;

  if ( !authorization ) {
    throw new ErrorException( 400, 'bad request' );
  }

  const accessToken = authorization.replace( 'Bearer ', '' );
  const result = jwtUtil.verify( accessToken );
  
  req.body.userId = result.userId;
};
