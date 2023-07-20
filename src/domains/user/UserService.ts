import ResException from '../../models/ResException';
import UserRepository from './UserRepository';
import User from './User';

export default class UserService {

  constructor( private userRepository: UserRepository ) {}

  async join( user: User ) {

    user.validateEmailFormat();
    await this.validateEmailRegistered( user.email );
    await user.hashPassword();

    return await this.userRepository.createUser( user.format() );
  }

  private async validateEmailRegistered( email: string ): Promise<void> {
    const registeredEmail = await this.userRepository.findByEmail( email );
    if ( registeredEmail ) {
      throw new ResException( 400, 'already registered email' );
    }
  }
}

