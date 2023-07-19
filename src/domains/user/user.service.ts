import ResException from '../../models/ResException';
import UserUtil from '../../models/UserUtil';

export default class UserService {
  constructor( private userRepository ) {}

  async join({ email, password }) {
    if ( !UserUtil.isEmail( email ) ) {
      throw new ResException( 400, '잘못된 이메일 형식' );
    }

    if ( await this.userRepository.findByEmail( email ) ) {
      throw new ResException( 400, '이미 존재하는 이메일' );
    }

    return await this.userRepository.createUser({ 
      email, 
      password: await UserUtil.hashPassword( password ), 
    });
  }
}

