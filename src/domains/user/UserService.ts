import ResException from '../../models/ResException';
import UserRepository from './UserRepository';
import User from './User';

export default class UserService {

  constructor( private userRepository: UserRepository ) {}

  async join( user: User ) {

    user.validateEmail();

    if ( await this.userRepository.findByEmail( user.email ) ) {
      throw new ResException( 400, 'already registered email' );
    }

    await user.hashPassword();

    return await this.userRepository.createUser( user.format() );
  }
}

