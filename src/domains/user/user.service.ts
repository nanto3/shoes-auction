import ResException from '../../models/ResException';
import { EMAIL_REGEX } from '../../constants/const';
import { hashPassword } from '../../utils/hash';

export default class UserService {
  constructor( private userRepository ) {}

  private isEmail = ( email: string ) => EMAIL_REGEX.test( email );

  async join({ email, password }) {
    if ( !this.isEmail( email ) ) {
      throw new ResException( 400, '잘못된 이메일 형식' );
    }

    if ( await this.userRepository.findByEmail( email ) ) {
      throw new ResException( 400, '이미 존재하는 이메일' );
    }

    return await this.userRepository.createUser({ 
      email, 
      password: await hashPassword( password ), 
    });
  }
}

