import express, { Express } from 'express';
import { Options, OptionsText, OptionsJson, OptionsUrlencoded } from 'body-parser';
import cors, { CorsOptions } from 'cors';

interface CreateAppOptions {
  raw?: Options;
  text?: OptionsText;
  json?: OptionsJson;
  urlencoded?: OptionsUrlencoded;
  cors?: CorsOptions;
}

type Router = ( app: Express ) => void

export const createApp = ( router: Router, options: CreateAppOptions={}): Express => {
  const app = express();

  app.use( express.raw( options.raw ) );
  app.use( express.text( options.text ) );
  app.use( express.urlencoded( options.urlencoded ) );
  app.use( express.raw( options.raw ) );
  app.use( cors( options.cors ) );

  router( app );

  return app;
};
