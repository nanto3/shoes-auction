import { typeChecker } from "./type-helper";

export default class ErrorException extends Error {
  private status: number;
  private previousError: Error;

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
      throw new ErrorException( statusOrMessage, message );
    }
  };

export const excptIfTruthy = excptIfTruthyOrFalsyFormat( true );

export const excptIfFalsy = excptIfTruthyOrFalsyFormat( false );

export const excptIfNotType = ( type: keyof typeof typeChecker, ...values: unknown[]): void => {
  const isCorrectType = typeChecker[type];
  values.forEach( value => {
    if ( !isCorrectType( value ) )
      throw new ErrorException( 400, 'bad request' );
  });
};
