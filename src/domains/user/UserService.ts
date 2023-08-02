import { excptIfTruthy, excptIfFalsy } from '../../utils/ResException';
import UserRepository from './UserRepository';
import UserUtil from '../../utils/UserUtil';
import { issueJwt } from '../../utils/jwt';

export default class UserService {

  constructor( private userRepository: UserRepository ) {}

  async join( email: string, password: string ) {
    excptIfTruthy( await this.getUserByEmail( email ), 'already registered email' );
    
    return await this.userRepository.createUser({ email, password });
  }

  async login( email: string, password: string ) {
    const userInDb = await this.getUserByEmail( email );
    
    excptIfFalsy( userInDb, 'not registered user' );
    excptIfFalsy( await UserUtil.isCorrectPassword( password, userInDb.password ), 401, 'wrong password' );

    return {
      accessToken: issueJwt( 'access', { userUuid: userInDb.uuid }),
      refreshToken: issueJwt( 'refresh' ),
      userUuid: userInDb.uuid,
    };
  }

  async getUserByEmail( email: string ) {
    return await this.userRepository.findOneBy({ email });
  }

  async getUserByUuid( uuid: string ) {
    return await this.userRepository.findOneBy({ uuid });
  }
}
