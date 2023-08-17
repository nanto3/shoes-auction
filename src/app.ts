import envConfig from './configs/env.config';
import startRoute from './domains/router';
import createApp from './utils/frame-util/create-app';
import { checkDbConnection } from './entities';
import { connectRedis } from './configs/redis.config';

const startApp = async () => {
  const app = await createApp( startRoute, {
    json: { limit: '50mb' },
    urlencoded: {
      limit: '50mb',
      extended: false,
      parameterLimit: 1_000_000,
    },
    cors: { credentials: true },
  });
  
  await Promise.all([ checkDbConnection(), connectRedis() ]);
  app.listen( envConfig.port , () => 
    console.log( `Start shoes-auction server on port ${envConfig.port}` ) );
};

startApp();
