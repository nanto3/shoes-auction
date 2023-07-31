import express from 'express';
import envConfig from './configs/envConfig';
import routers from './domains/routers';
import { setReceiveOptions } from './setReceiveOptions';
import { emitNotFoundError, handleError } from './utils/responder';
import { checkDbConnection } from './entities';

const app: express.Express = express();

setReceiveOptions( app );

app.use( routers );
app.use( emitNotFoundError );
app.use( handleError );

checkDbConnection.then( () => 
  app.listen( envConfig.port , async () => 
    console.log( 'Start shoes-auction server' ) ) );
