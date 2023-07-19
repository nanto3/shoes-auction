import { Request, Response, NextFunction } from 'express';
import ResException from '../models/ResException';

type ProcessRequest = ( request: Request ) => Promise<Record<string, any>> | Record<string, any>;

export const respond = ( processRequest: ProcessRequest ) => 
  async ( req: Request, res: Response, next: NextFunction ) => {
    try {
      res.status( 200 ).json({ message: await processRequest( req ) });
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

export const emitNotFoundError = ( req: Request, res: Response, next: NextFunction ) => 
  next( new ResException( 404, 'not found' ) );

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handleError = ( error: ResException | Error, req: Request, res: Response, next: NextFunction ) => {
  console.log( error ); 
  respondError( res, error ) ;
};
