import jwt, { JwtPayload } from 'jsonwebtoken';
import ResException from '../models/ResException';
import envConfig from '../configs/envConfig';

const jwtSecret = envConfig.jwtSecret;

const INVALID_SIGNATURE = 'invalid signature';
const JWT_EXPIRED = 'jwt expired';

const A_DAY_BY_SECONDS = 60 * 60 * 24;
export const EXPIRY_OF_ACCESS_TOKEN_BY_SECOND = A_DAY_BY_SECONDS * 7;
export const EXPIRY_OF_REFRESH_TOKEN_BY_SECOND = A_DAY_BY_SECONDS * 30;

export const issueJwt = ( 
  type: 'access' | 'refresh', 
  payload: Record<string, unknown>={}): string => 
  jwt.sign( payload, jwtSecret, { 
    algorithm: 'HS256', 
    expiresIn: type === 'access' ? 
      EXPIRY_OF_ACCESS_TOKEN_BY_SECOND : 
      EXPIRY_OF_REFRESH_TOKEN_BY_SECOND, 
  });

export const verify = ( token: string ): JwtPayload => {
  try {
    return jwt.verify( token, jwtSecret ) as JwtPayload;
  } catch ( error ) {
    if ( error.message === INVALID_SIGNATURE ) {
      throw new ResException( 401, 'not authenticated' );
    }
    if ( error.message === JWT_EXPIRED ) {
      throw new ResException( 401, 'login expired' );
    }
  }
};

interface Verified {
  exp: number;
  iat: number;
}

export const needReissueRefreshToken = ( verified: Verified ): boolean => 
  verified.exp - verified.iat < EXPIRY_OF_REFRESH_TOKEN_BY_SECOND;
