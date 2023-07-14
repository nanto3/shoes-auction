import express from 'express';
import envConfig from './configs/env';
import { setReceiveOptions } from './utils/setReceiveOptions';
import routers from './routers';
import { emitWrongRouteError, handleError } from './utils/controller';

const app: express.Application = express();

setReceiveOptions( app, { json: express.json, urlencoded: express.urlencoded });

app.use( routers );
app.use( emitWrongRouteError );
app.use( handleError );

app.listen( envConfig.port , () => console.log( 'start shoes-auction server' ) );
