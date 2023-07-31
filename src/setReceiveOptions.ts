import { Express, Request, Response, NextFunction, json, urlencoded } from 'express';
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

export const setReceiveOptions = ( app: Express ) => {
  app.use( json( receiveConfig.json ) );
  app.use( urlencoded( receiveConfig.urlencoded ) );
  app.use( cors({ credentials: true }) );
};
