import envConfig from './configs/env.config';
import router from './domains/router';
import { createApp } from './utils/createApp';
import { checkDbConnection } from './entities';

const startApp = async () => {
  const app = createApp( router, {
    json: { limit: '50mb' },
    urlencoded: {
      limit: '50mb',
      extended: false,
      parameterLimit: 1_000_000,
    },
    cors: { credentials: true },
  });
  
  await checkDbConnection();
  app.listen( envConfig.port , () => 
    console.log( `Start shoes-auction server on port ${envConfig.port}` ) );
};

startApp();
