import { type UserRepository } from './user.repository';
import { RedisClient } from '../../configs/redis.config';
import { excptIfTruthy, excptIfFalsy } from '../../utils/error-exception';
import { issueJwt } from '../../utils/jwt';
import { v4 as uuidv4 } from 'uuid';

export class UserService {
  constructor( private userRepository: UserRepository, private redisClient: RedisClient ) {}

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

  async getUuid({ email, birthday }) {
    const user = await this.userRepository.findOneBy({ email, birthday });
    excptIfFalsy( user, 'not match personal info' );
    
    const uuid = uuidv4();
    this.redisClient.saveUuidByEmail( email, uuid );
    return uuid;
  }

  async getUserWithNewPassword({ email, tempUuid, password }) {
    const uuid = this.redisClient.getUuidByEmail( email );
    excptIfFalsy( tempUuid === uuid, 405, 'not allowed' );
    
    const user = await this.getUserByEmail( email );
    await user.setNewPassword( password );
    return await user.save();
  }

  async getUserByEmail( email: string ) {
    return await this.userRepository.findOneBy({ email });
  }

  async getUserByUuid( uuid: string ) {
    return await this.userRepository.findOneBy({ uuid });
  }
}
