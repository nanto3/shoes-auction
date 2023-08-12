import jwt, { JwtPayload } from 'jsonwebtoken';
import ErrorException from './ErrorException';
import envConfig from '../configs/env.config';

const jwtSecret = envConfig.jwtSecret;

const INVALID_SIGNATURE = 'invalid signature';
const JWT_EXPIRED = 'jwt expired';

const A_DAY_BY_SECONDS = 60 * 60 * 24;
export const EXPIRY_OF_ACCESS_TOKEN_BY_SECOND = A_DAY_BY_SECONDS * 7;
export const EXPIRY_OF_REFRESH_TOKEN_BY_SECOND = A_DAY_BY_SECONDS * 30;

interface Verified {
  exp: number;
  iat: number;
}

const jwtUtil = {
  issueJwt: ( 
    sort: 'access' | 'refresh', 
    payload: Record<string, unknown>={}): string => 
    jwt.sign( payload, jwtSecret, { 
      algorithm: 'HS256', 
      expiresIn: sort === 'access' ? 
        EXPIRY_OF_ACCESS_TOKEN_BY_SECOND : 
        EXPIRY_OF_REFRESH_TOKEN_BY_SECOND, 
    }),
  verify: ( token: string ): JwtPayload => {
    try {
      return jwt.verify( token, jwtSecret ) as JwtPayload;
    } catch ( error ) {
      if ( error.message === INVALID_SIGNATURE ) {
        throw new ErrorException( 401, 'not authenticated' );
      }
      if ( error.message === JWT_EXPIRED ) {
        throw new ErrorException( 401, 'login expired' );
      }
    }
  },
  needReissueRefreshToken: ( verified: Verified ): boolean => 
    verified.exp - verified.iat < EXPIRY_OF_REFRESH_TOKEN_BY_SECOND,
};

export default jwtUtil;
