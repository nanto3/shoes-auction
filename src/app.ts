import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

import envConfig from './configs/env';
import { resError } from './utils/response';
import ResException from './configs/ResException';

const app: express.Application = express();

const { port } = envConfig;

app.use( express.json({ limit: '50mb' }) );
app.use(
  express.urlencoded({
    limit: '50mb',
    extended: false,
    parameterLimit: 1_000_000,
  })
);
app.use( cors({ credentials: true }) );

//

app.use( ( req: Request, res: Response, next: NextFunction ) => {
  next( new ResException( 404, 'wrong route' ) );
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use( ( error: ResException | Error, req: Request, res: Response, next: NextFunction ) => {
  console.log( error );
  resError( res, error );
});

app.listen( port , () => console.log( 'start shoes-auction server' ) );