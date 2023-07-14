import { Application, Request, Response, NextFunction } from 'express';
import { Options, OptionsText, OptionsJson, OptionsUrlencoded } from 'body-parser';
import cors, { CorsOptions } from 'cors';


type ExpressMethod<T> = ( options: T ) => ( req: Request, res: Response, next: NextFunction ) => void;
interface ExpressMethods {
  raw?: ExpressMethod<Options>;
  text?: ExpressMethod<OptionsText>;
  json?: ExpressMethod<OptionsJson>;
  urlencoded?: ExpressMethod<OptionsUrlencoded>;
  cors?: ExpressMethod<CorsOptions>;
}

interface ReceiveConfigs {
  raw?: Options;
  text?: OptionsText;
  json?: OptionsJson;
  urlencoded?: OptionsUrlencoded;
  cors?: CorsOptions;
}
const receiveConfigs: ReceiveConfigs = { 
  json: { limit: '50mb' },
  urlencoded: {
    limit: '50mb',
    extended: false,
    parameterLimit: 1_000_000,
  },
};

export const setReceiveConfigs = ( app: Application, expressMethods: ExpressMethods ) => {
  Object
    .entries( expressMethods )
    .forEach( ([ key, method ]) => app.use( method( receiveConfigs[key]) ) );
  
  app.use( cors({ credentials: true }) );
};
