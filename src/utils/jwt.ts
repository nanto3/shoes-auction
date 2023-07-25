import jwt, { JwtPayload } from 'jsonwebtoken';
import ResException from '../models/ResException';
import envConfig from '../configs/envConfig';

const jwtSecret = envConfig.jwtSecret;

const HS256 = 'HS256';
const A_DAY_BY_SECONDS = 60 * 60 * 24;
export const EXPIRY_OF_ACCESS_TOKEN_BY_SECOND = A_DAY_BY_SECONDS * 7;
export const EXPIRY_OF_REFRESH_TOKEN_BY_SECOND = A_DAY_BY_SECONDS * 30;

// TODO: issueAccessToken, issueRefreshToken 하나로 합치기?
interface AccessTokenPayload {
  userUuid: string;
}

export const issueAccessToken = ( payload: AccessTokenPayload ): string => 
  jwt.sign( payload, jwtSecret, { 
    algorithm: HS256, 
    expiresIn: EXPIRY_OF_ACCESS_TOKEN_BY_SECOND, 
  });

export const issueRefreshToken = ( payload: Record<string, unknown>={}): string => 
  jwt.sign( payload, jwtSecret, { 
    algorithm: HS256, 
    expiresIn: EXPIRY_OF_REFRESH_TOKEN_BY_SECOND, 
  });

export const verify = ( token: string ): JwtPayload => {
  try {
    return jwt.verify( token, jwtSecret ) as JwtPayload;
  } catch ( error ) {
    if ( error.message === 'invalid signature' ) {
      throw new ResException( 401, 'not authenticated' );
    }
    if ( error.message === 'jwt expired' ) {
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
