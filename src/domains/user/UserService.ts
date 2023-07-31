import ResException from '../../models/ResException';
import UserRepository from './UserRepository';
import UserUtil from '../../utils/UserUtil';
import { issueAccessToken, issueRefreshToken } from '../../utils/jwt';

export default class UserService {

  constructor( private userRepository: UserRepository ) {}

  async join( email: string, password: string ) {
    if ( !UserUtil.isEmail( email ) ) {
      throw new ResException( 400, 'wrong email format' );
    }
    if ( await this.getUserByEmail( email ) ) {
      throw new ResException( 400, 'already registered email' );      
    }

    return await this.userRepository.createUser({ 
      email, 
      password: await UserUtil.hashPassword( password ), 
    });
  }

  async login( email: string, password: string ) {
    const userInDb = await this.getUserByEmail( email );
    if ( !userInDb ) {
      throw new ResException( 400, 'not registered user' );
    }
    const isCorrectPassword = await UserUtil.validatePassword( password, userInDb.password );
    if ( !isCorrectPassword ) {
      throw new ResException( 401, 'wrong password' );
    }

    return {
      accessToken: issueAccessToken({ userUuid: userInDb.uuid }),
      refreshToken: issueRefreshToken(),
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
