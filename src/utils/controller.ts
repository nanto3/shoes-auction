import { Request, Response, NextFunction } from 'express';

type Flow = ( request: Request ) => Promise<Record<string, any>> | Record<string, any>;
export const respond = ( flow: Flow ) => 
  async ( req: Request, res: Response, next: NextFunction ) => {
    try {
      res.status( 200 ).json({ message: await flow( req ) });
    } catch ( error ) {
      next( error );
    }
  };

interface ResError {
  status?: number;
  message?: string;
}
export const respondError = ( res: Response, error: ResError ) => 
  res.status( error.status || 500 ).json({ message: error.message || 'undefined error' });
