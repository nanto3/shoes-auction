import { Request, Response, NextFunction, CookieOptions } from 'express';
import ResException from '../models/ResException';
import { isString, isBoolean, isNumber } from './typeHelper';

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

export const notFoundRoute = ( _: Request, res: Response ) => {
  res.status( 404 ).json({ message: 'not found route' });
};

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
  const check = typeChecker[type];
  values.forEach( value => {
    if ( !check( value ) )
      throw new ResException( 400, 'bad data' );
  });
};
