import { Request, Response, CookieOptions } from 'express';

interface ResOptions {
  setCookie: ( name: string, value: unknown, options?: CookieOptions ) => void;
} 

type ProcessReq = ( req: Request, resOptions: ResOptions ) => Promise<Record<string, any>> | Record<string, any>;

export const respond = ( processReq: ProcessReq ) => 
  async ( req: Request, res: Response ) => {
    try {
      const message = await processReq( req, { setCookie: ( name, value, options ) => res.cookie( name, value, options ) });
      res.status( 200 ).json({ message });
    } catch ( error ) {
      console.log( error ); 
      res.status( error.status || 500 ).json({ message: error.message || 'not defined error' });
    }
  };

export const notFoundRoute = ( _, res: Response ) => {
  res.status( 404 ).json({ message: 'not found route' });
};
