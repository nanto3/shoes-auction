import { Request, Response, NextFunction, CookieOptions } from 'express';

interface ResOptions {
  setCookie: ( name: string, value: unknown, options?: CookieOptions ) => void;
} 

export type ProcessReq = ( req: Request, resOptions: ResOptions ) => Promise<Record<string, any>> | Record<string, any>;

const respond = ( processReq: ProcessReq ) => 
  async ( req: Request, res: Response, next: NextFunction ): Promise<void> => {
    try {
      const message = await processReq( req, { setCookie: ( name, value, options ) => res.cookie( name, value, options ) });
      res.status( 200 ).json({ message });
    } catch ( error ) {
      next( error );
    }
  };

interface ParamError {
  status?: number;
  message?: string;
}

export const handleError = ( error: ParamError, _, res: Response, __ ) => {
  console.log( error ); 
  res.status( error.status || 500 ).json({ message: error.message || 'not defined error' });
};

export const respondNotFoundRoute = ( _: Request, res: Response, __: NextFunction ): void => {
  res.status( 404 ).json({ message: 'not found route' });
};

export default respond;
