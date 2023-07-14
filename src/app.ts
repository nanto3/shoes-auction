/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

import envConfig from './configs/env';
import ResException from './utils/ResException';
import routers from './routers';
import { respondError } from './utils/controller';

const { port } = envConfig;

const app: express.Application = express();

app.use( express.json({ limit: '50mb' }) );
app.use(
  express.urlencoded({
    limit: '50mb',
    extended: false,
    parameterLimit: 1_000_000,
  })
);
app.use( cors({ credentials: true }) );

app.use( routers );

app.use( ( req: Request, res: Response, next: NextFunction ) => {
  next( new ResException( 404, 'wrong route' ) );
});


app.use( ( error: ResException | Error, req: Request, res: Response, next: NextFunction ) => {
  console.log( error );
  respondError( res, error );
});

app.listen( port , () => console.log( 'start shoes-auction server' ) );
