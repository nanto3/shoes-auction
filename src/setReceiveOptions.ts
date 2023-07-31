import { Express, json, urlencoded } from 'express';
import cors from 'cors';

export const setReceiveOptions = ( app: Express ) => {
  app.use( json({ limit: '50mb' }) );
  app.use( urlencoded({
    limit: '50mb',
    extended: false,
    parameterLimit: 1_000_000,
  }) );
  app.use( cors({ credentials: true }) );
};
