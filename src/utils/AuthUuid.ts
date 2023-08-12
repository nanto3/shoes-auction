import { RedisClient } from "../configs/redis.config";
import { v4 as uuidv4 } from 'uuid';

export class AuthUuid {
  constructor( private redisClient: RedisClient ) {}

  async createUuid( key: string ) {
    const uuid: string = uuidv4();
    await this.redisClient.saveUuidByEmail( key, uuid );
    return uuid;
  }

  async validateUuid( key: string, uuid: string ) {
    const _uuid = await this.redisClient.getUuidByEmail( key );
    return _uuid === uuid;
  }
}
