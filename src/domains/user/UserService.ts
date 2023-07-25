import ResException from '../../models/ResException';
import UserRepository from './UserRepository';
import User from './User';
import { issueAccessToken, issueRefreshToken } from '../../utils/jwt';

export default class UserService {

  constructor( private userRepository: UserRepository ) {}

  async join( user: User ) {
    user.validateEmailFormat();
    await this.validateEmailRegistered( user.email, false );
    await user.hashPassword();

    return await this.userRepository.createUser( user.format() );
  }

  async login( user: User ) {
    const [ dbUser ] = await Promise.all([ 
      this.getUserByEmail( user.email ), 
      user.hashPassword(), 
    ]);
    
    if ( !dbUser ) {
      throw new ResException( 400, 'not registered email' );
    }
    if ( user.password !== dbUser.password ) {
      throw new ResException( 401, 'wrong password' );
    }

    return {
      accessToken: issueAccessToken({ userUuid: dbUser.uuid }),
      refreshsToken: issueRefreshToken(),
      uuid: dbUser.uuid,
      email: dbUser.email,
    };
  }

  private async validateEmailRegistered( email: string, needRegistered=true ): Promise<void> {
    const errorMessage = needRegistered ? 'not registered email' : 'already registered email';
    const registered = !!( await this.getUserByEmail( email ) );
    if ( needRegistered ? !registered : registered ) {
      throw new ResException( 400, errorMessage );
    }
  }

  async getUserByEmail( email: string ) {
    return await this.userRepository.findOneBy({ email });
  }

  async getUserByUuid( uuid: string ) {
    return await this.userRepository.findOneBy({ uuid });
  }
}
