import { Request, Response, NextFunction, CookieOptions } from 'express';
import ResException from '../models/ResException';
import { isString, isBoolean, isNumber, isArray } from './typeHelper';

interface ResOptions {
  setCookie: ( name: string, value: unknown, options?: CookieOptions ) => void;
} 

type ProcessReq = ( req: Request, resOptions: ResOptions ) => Promise<Record<string, any>> | Record<string, any>;

export const respond = ( processReq: ProcessReq ) => 
  async ( req: Request, res: Response, next: NextFunction ) => {
    try {
      const message = await processReq( req, { setCookie: ( name, value, options ) => res.cookie( name, value, options ) });
      res.status( 200 ).json({ message });
    } catch ( error ) {
      next( error );
    }
  };

interface ResError {
  status?: number;
  message?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handleError = ( error: ResError, req: Request, res: Response, next: NextFunction ) => {
  console.log( error ); 
  res.status( error.status || 500 ).json({ message: error.message || 'not defined error' });
};

export const emitNotFoundError = ( req: Request, res: Response, next: NextFunction ) => 
  next( new ResException( 404, 'not found' ) );


// excpt === exception
const excptIfFormat = ( postfix: boolean ) => 
  ( value: unknown, codeOrMessage?: number | string, message?: string ) => {
    if ( !message ) {
      message = codeOrMessage as string || '';
      codeOrMessage = 400;
    }
    
    if ( postfix ? value : !value ) {
      throw new ResException( codeOrMessage , message );
    }
  }; 

export const excptIfTruthy = excptIfFormat( true );
export const excptIfFalsy = excptIfFormat( false );

const typeChecker = { 
  'string': isString,
  'boolean': isBoolean,
  'number': isNumber,
};

export const checkType = ( type: keyof typeof typeChecker, ...values: unknown[]) => {
  values.forEach( value => {
    if ( !typeChecker[type]( value ) )
      throw new ResException( 400, 'bad data' );
  });
};
