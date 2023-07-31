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

const respondError = ( res: Response, error: ResError ) => 
  res.status( error.status || 500 ).json({ message: error.message || 'not defined error' });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handleError = ( error: ResException | Error, req: Request, res: Response, next: NextFunction ) => {
  console.log( error ); 
  respondError( res, error ) ;
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

const typeCheck = { 
  'string': isString,
  'boolean': isBoolean,
  'number': isNumber,
};
const checkTypeForamt = ( type: string ) => 
  ( ...values: any | any[]) => {
    if ( !isArray( values ) ) {
      values = [ values ];
    }
    values.forEach( value => {
      if ( !typeCheck[type]( value ) )
        throw new ResException( 400, 'bad data' );
    });
  };
export const checkString = checkTypeForamt( 'string' );
export const checkNumber = checkTypeForamt( 'number' );
export const checkBoolean = checkTypeForamt( 'boolean' );
