import express from 'express';
import envConfig from './configs/envConfig';
import routers from './domains/routers';
import { setReceiveOptions } from './utils/setReceiveOptions';
import { emitNotFoundError, handleError } from './utils/responder';
import { checkDbConnection } from './domains/entity';

const app: express.Application = express();

setReceiveOptions( app, {
  json: express.json, 
  urlencoded: express.urlencoded, 
});

app.use( routers );
app.use( emitNotFoundError );
app.use( handleError );

checkDbConnection
  .then( () => app.listen( envConfig.port , async () => 
    console.log( 'Start shoes-auction server' ) ) );
