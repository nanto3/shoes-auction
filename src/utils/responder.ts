import { Request, Response, NextFunction, CookieOptions } from 'express';
import ResException from '../models/ResException';

interface ResOptions {
  setCookie: ( param: {
    name: string, 
    value: any, 
    options?: CookieOptions
  }) => void;
} 

type ProcessReq = ( req: Request, resOptions: ResOptions ) => Promise<Record<string, any>> | Record<string, any>;

export const respond = ( processReq: ProcessReq ) => 
  async ( req: Request, res: Response, next: NextFunction ) => {
    try {
      res.status( 200 ).json({ message: await processReq( req, { setCookie: ( param ) => res.cookie( param.name, param.value, param.options ) }) });
    } catch ( error ) {
      next( error );
    }
  };

interface ResError {
  status?: number;
  message?: string;
}

const respondError = ( res: Response, error: ResError ) => 
  res.status( error.status || 500 ).json({ message: error.message || 'not defined error' });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handleError = ( error: ResException | Error, req: Request, res: Response, next: NextFunction ) => {
  console.log( error ); 
  respondError( res, error ) ;
};

export const emitNotFoundError = ( req: Request, res: Response, next: NextFunction ) => 
  next( new ResException( 404, 'not found' ) );
