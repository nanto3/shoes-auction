import ResException from '../../models/ResException';
import UserUtil from '../../models/UserUtil';

export default class UserService {
  constructor( private userRepository ) {}

  async join({ email, password }) {
    if ( !UserUtil.isEmail( email ) ) {
      throw new ResException( 400, 'wrong email format' );
    }

    if ( await this.userRepository.findByEmail( email ) ) {
      throw new ResException( 400, 'already registered email' );
    }

    return await this.userRepository.createUser({ 
      email, 
      password: await UserUtil.hashPassword( password ), 
    });
  }
}

