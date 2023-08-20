import express, { Express, Router } from 'express';
import { Options, OptionsText, OptionsJson, OptionsUrlencoded } from 'body-parser';
import cors, { CorsOptions } from 'cors';
import cookieParser from 'cookie-parser';

interface CreateAppOptions {
  raw?: Options;
  text?: OptionsText;
  json?: OptionsJson;
  urlencoded?: OptionsUrlencoded;
  cors?: CorsOptions;
}

const createApp = async ( startRoute, options: CreateAppOptions={}): Promise<Express> => {
  const app = express();

  app.use( express.raw( options.raw ) );
  app.use( express.text( options.text ) );
  app.use( express.urlencoded( options.urlencoded ) );
  app.use( express.json( options.json ) );
  app.use( cors( options.cors ) );
  app.use( cookieParser() );

  const router = Router();
  await startRoute( router );
  app.use( router );

  return app;
};

export default createApp;
