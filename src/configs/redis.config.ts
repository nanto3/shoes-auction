import { createClient } from 'redis';

const EMAIL_UUID_EXPIRED_TIME = 60 * 10;

const client = createClient();

client.on( 'connect', () => console.log( 'Redis connected' ) );
client.on( 'error', error => console.error( error, 'Redis error' ) );

export const connectRedis = async () => await client.connect();

export interface RedisClient {
  saveUuidByEmail: ( email: string, uuid: string ) => Promise<void>;
  getUuidByEmail: ( email: string ) => Promise<string>
}

const redisClient: RedisClient = {
  saveUuidByEmail: async ( email: string, uuid: string ) => {
    await client.set( email, uuid );
    await client.expire( email, EMAIL_UUID_EXPIRED_TIME );
  },
  getUuidByEmail: async ( email: string ) => await client.get( email ),
};

export default redisClient;
