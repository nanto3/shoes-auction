import express from 'express';
import envConfig from './configs/env.config';
import router from './domains/router';
import { setReceiveOptions } from './setReceiveOptions';
import { checkDbConnection } from './entities';

const app: express.Express = express();

setReceiveOptions( app );
app.use( router );

checkDbConnection.then( () => 
  app.listen( envConfig.port , async () => 
    console.log( 'Start shoes-auction server' ) ) );
