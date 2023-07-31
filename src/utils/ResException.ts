import { typeChecker } from "./typeHelper";

// TODO: 속성 private 처리
export default class ResException extends Error {
  status: number;
  message: string;
  previousError: Error;

  constructor( status, message='', error=null ) {
    super( message );
    this.status = status;
    this.message = message;
    this.previousError = error;
  }
}

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

export const checkType = ( type: keyof typeof typeChecker, ...values: unknown[]) => {
  const check = typeChecker[type];
  values.forEach( value => {
    if ( !check( value ) )
      throw new ResException( 400, 'bad data' );
  });
};

