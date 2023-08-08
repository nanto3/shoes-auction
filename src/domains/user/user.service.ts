import { excptIfTruthy, excptIfFalsy } from '../../utils/error-exception';
import UserRepository from './user.repository';
import { issueJwt } from '../../utils/jwt';

export default class UserService {

  constructor( private userRepository: UserRepository ) {}

  async join( email: string, password: string ) {
    excptIfTruthy( await this.getUserByEmail( email ), 'already registered email' );
    
    return await this.userRepository.createUser({ email, password });
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

  async getUserByEmail( email: string ) {
    return await this.userRepository.findOneBy({ email });
  }

  async getUserByUuid( uuid: string ) {
    return await this.userRepository.findOneBy({ uuid });
  }
}
