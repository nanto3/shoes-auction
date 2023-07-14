import { Request, Response, NextFunction } from 'express';

export const resError = ( res: Response, error: any ) => 
  res.status( error?.status ||  500 ).json({ message: error?.message || 'undefined error' });

type Control = ( request: Request ) => Promise<Record<string, any>>;
export const controller = ( control: Control ) => 
  async ( req: Request, res: Response, next: NextFunction ) => 
    res.status( 200 ).json({
      message: await control( req )
        .catch( error => next( error ) ), 
    });
