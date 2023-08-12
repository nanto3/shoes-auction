import { type UserRepository } from './user.repository';
import type JwtUtil from '../../utils/jwt';
import type AuthUuid from '../../utils/AuthUuid';
import { excptIfTruthy, excptIfFalsy } from '../../utils/ErrorException';

export class UserService {
  constructor( 
    private readonly userRepository: UserRepository,
    private readonly jwtUtil: typeof JwtUtil,
    private readonly authUuid: AuthUuid ) {}

  async join({ email, password, birthday }: UserJoinInfo ) {
    excptIfTruthy( await this.getUserByEmail( email ), 'already registered email' );

    return await this.userRepository.createUser({ email, password, birthday });
  }

  async login( email: string, password: string ) {
    const user = await this.getUserByEmail( email );

    excptIfFalsy( user, 'not registered user' );
    excptIfFalsy( await user.validatePassword( password ), 401, 'wrong password' );

    return {
      accessToken: this.jwtUtil.issueJwt( 'access', { userId: user.id }),
      refreshToken: this.jwtUtil.issueJwt( 'refresh' ),
      userId: user.id,
    };
  }

  async createUuid({ email, birthday }: UserAuthInfo ) {
    const user = await this.userRepository.findOneBy({ email, birthday });
    excptIfFalsy( user, 'not match user info' );
    
    return await this.authUuid.createUuid( email );
  }

  async changePassword({ email, authUuid, password }: UserInfoForPasswordChange ) {
    excptIfFalsy( await this.authUuid.validateUuid( email, authUuid ), 405, 'not allowed' );
    
    const user = await this.getUserByEmail( email );
    excptIfFalsy( user, 'not registered user' );

    await user.setNewPassword( password );

    return await user.save();
  }

  async getUserByEmail( email: string ) {
    return await this.userRepository.findOneBy({ email });
  }

  async getUserById( id: number ) {
    return await this.userRepository.findOneBy({ id });
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
