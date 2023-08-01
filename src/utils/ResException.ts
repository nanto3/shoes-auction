import { typeChecker } from "./typeHelper";

export default class ResException extends Error {
  status: number;
  message: string;
  previousError: Error;

  constructor( status: number, messageOrError: string | Error='', error: Error=null ) {
    if ( messageOrError && typeof messageOrError !== 'string' ) {
      error = messageOrError;
      messageOrError = '';
    }
    super( messageOrError as string );
    this.status = status;
    this.message = messageOrError as string;
    this.previousError = error;
  }
}

// 'excpt'는 'exception'을 의미
const excptIfTruthyOrFalsyFormat = ( filterTruthy: boolean ) => 
  ( value: unknown, statusOrMessage?: number | string, message='' ) => {
    if ( typeChecker.string( statusOrMessage ) ) {
      message = statusOrMessage as string;
      statusOrMessage = 400;
    }
    if ( filterTruthy ? value : !value ) {
      throw new ResException( statusOrMessage as number, message );
    }
  };

export const excptIfTruthy = excptIfTruthyOrFalsyFormat( true );

export const excptIfFalsy = excptIfTruthyOrFalsyFormat( false );

export const excptIfNotType = ( type: keyof typeof typeChecker, ...values: unknown[]) => {
  const isCorrectType = typeChecker[type];
  values.forEach( value => {
    if ( !isCorrectType( value ) )
      throw new ResException( 400, 'bad data' );
  });
};
