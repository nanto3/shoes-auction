import express from 'express';
import envConfig from './configs/env.config';
import { setReceiveOptions } from './utils/setReceiveOptions';
import routers from './domains/routers';
import { emitNotFoundError, handleError } from './utils/responder';
import { checkConnection } from './configs/sequelize.config';

const app: express.Application = express();

setReceiveOptions( app, {
  json: express.json, 
  urlencoded: express.urlencoded, 
});

app.use( routers );
app.use( emitNotFoundError );
app.use( handleError );

app.listen( envConfig.port , async () => {
  await checkConnection();
  console.log( 'Start shoes-auction server' );
});
