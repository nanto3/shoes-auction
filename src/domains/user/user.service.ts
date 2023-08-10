import { type UserRepository } from './user.repository';
import { excptIfTruthy, excptIfFalsy } from '../../utils/error-exception';
import { issueJwt } from '../../utils/jwt';

export class UserService {
  constructor( private userRepository: UserRepository ) {}

  async join( email: string, password: string, birthday: string ) {
    excptIfTruthy( await this.getUserByEmail( email ), 'already registered email' );
    
    return await this.userRepository.createUser({ email, password, birthday });
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

  async getUserWithNewPassword({ email, birthday, password }) {
    const user = await this.getUserByEmailAndBirthday({ email, birthday });
    excptIfFalsy( user, 'not match personal info' );

    await user.setNewPassword( password );
    return await user.save();
  }

  async getUserByEmail( email: string ) {
    return await this.userRepository.findOneBy({ email });
  }

  async getUserByUuid( uuid: string ) {
    return await this.userRepository.findOneBy({ uuid });
  }

  async getUserByEmailAndBirthday({ email, birthday }) {
    return await this.userRepository.findOneBy({ email, birthday });
  }
}
