import { type UserRepository } from './user.repository';
import { RedisClient } from '../../configs/redis.config';
import { excptIfTruthy, excptIfFalsy } from '../../utils/ErrorException';
import { issueJwt } from '../../utils/jwt';
import { type AuthUuid } from '../../utils/AuthUuid';
import { v4 as uuidv4 } from 'uuid';

export class UserService {
  constructor( private userRepository: UserRepository, private authUuid: AuthUuid ) {}

  async join({ email, password, birthday }: UserJoinInfo ) {
    excptIfTruthy( await this.getUserByEmail( email ), 'already registered email' );
    
    return await this.userRepository.createUser({ email, password, birthday });
  }

  async login( email: string, password: string ) {
    const user = await this.getUserByEmail( email );

    excptIfFalsy( user, 'not registered user' );
    excptIfFalsy( await user.validatePassword( password ), 401, 'wrong password' );

    return {
      accessToken: issueJwt( 'access', { userUuid: user.uuid }),
      refreshToken: issueJwt( 'refresh' ),
      userUuid: user.uuid,
    };
  }

  async createUuid({ email, birthday }: UserAuthInfo ) {
    const user = await this.userRepository.findOneBy({ email, birthday });
    excptIfFalsy( user, 'not match personal info' );
    
    return await this.authUuid.createUuid( email );
  }

  async changePassword({ email, authUuid, password }: UserInfoForPasswordChange ) {
    excptIfFalsy( await this.authUuid.validateUuid( email, authUuid ), 405, 'not allowed' );
    
    const user = await this.getUserByEmail( email );
    excptIfFalsy( user, 'not registered user' );

    await user.setNewPassword( password );

    return true;
  }

  async getUserByEmail( email: string ) {
    return await this.userRepository.findOneBy({ email });
  }

  async getUserByUuid( uuid: string ) {
    return await this.userRepository.findOneBy({ uuid });
  }
}

interface UserJoinInfo {
  email: string;
  password: string;
  birthday: string;
}
interface UserAuthInfo {
  email: string;
  birthday: string;
}
interface UserInfoForPasswordChange {
  email: string;
  authUuid: string;
  password: string;
}
