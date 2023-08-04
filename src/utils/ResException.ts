import { typeChecker } from "./typeHelper";

export default class ResException extends Error {
  status: number;
  message: string;
  previousError: Error;

  constructor( status: number, messageOrError: string | Error='', error: Error=null ) {
    if ( typeof messageOrError !== 'string' ) {
      error = messageOrError;
      messageOrError = '';
    }
    super( messageOrError );
    this.status = status;
    this.message = messageOrError;
    this.previousError = error;
  }
}

// 'excpt'는 'exception'을 의미
const excptIfTruthyOrFalsyFormat = ( filterTruthy: boolean ) => 
  ( value: unknown, statusOrMessage: number | string=400, message='' ): void => {
    if ( typeof statusOrMessage !== 'number' ) {
      message = statusOrMessage;
      statusOrMessage = 400;
    }
    if ( filterTruthy ? value : !value ) {
      throw new ResException( statusOrMessage, message );
    }
  };

export const excptIfTruthy = excptIfTruthyOrFalsyFormat( true );

export const excptIfFalsy = excptIfTruthyOrFalsyFormat( false );

export const excptIfNotType = ( type: keyof typeof typeChecker, ...values: unknown[]): void => {
  const isCorrectType = typeChecker[type];
  values.forEach( value => {
    if ( !isCorrectType( value ) )
      throw new ResException( 400, 'bad request' );
  });
};
