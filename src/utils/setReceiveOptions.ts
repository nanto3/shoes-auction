import { Application, Request, Response, NextFunction } from 'express';
import { Options, OptionsText, OptionsJson, OptionsUrlencoded } from 'body-parser';
import cors, { CorsOptions } from 'cors';


type ReceiveMethod<T> = ( options: T ) => ( req: Request, res: Response, next: NextFunction ) => void;
interface ReceiveTool {
  raw?: ReceiveMethod<Options>;
  text?: ReceiveMethod<OptionsText>;
  json?: ReceiveMethod<OptionsJson>;
  urlencoded?: ReceiveMethod<OptionsUrlencoded>;
  cors?: ReceiveMethod<CorsOptions>;
}

interface ReceiveConfig {
  raw?: Options;
  text?: OptionsText;
  json?: OptionsJson;
  urlencoded?: OptionsUrlencoded;
  cors?: CorsOptions;
}
const receiveConfig: ReceiveConfig = { 
  json: { limit: '50mb' },
  urlencoded: {
    limit: '50mb',
    extended: false,
    parameterLimit: 1_000_000,
  },
};

export const setReceiveOptions = ( app: Application, receiveTool: ReceiveTool={}) => {
  Object
    .entries( receiveTool )
    .forEach( ([ key, method ]) => app.use( method( receiveConfig[key]) ) );
  
  app.use( cors({ credentials: true }) );
};
