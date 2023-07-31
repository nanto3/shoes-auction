import { typeChecker } from "./typeHelper";

// TODO: 속성 private 처리
export default class ResException extends Error {
  status: number;
  message: string;
  previousError: Error;

  constructor( status: number, message='', error=null ) {
    super( message );
    this.status = status;
    this.message = message;
    this.previousError = error;
  }
}

// 'excpt'는 'exception'을 의미
const excptIf_postfix = ( postfix: boolean ) => 
  ( value: unknown, statusOrMessage?: number | string, message='' ) => {
    if ( typeChecker.string( statusOrMessage ) ) {
      message = statusOrMessage as string;
      statusOrMessage = 400;
    }
    
    if ( postfix ? value : !value ) {
      throw new ResException( statusOrMessage as number, message );
    }
  };

export const excptIfTruthy = excptIf_postfix( true );

export const excptIfFalsy = excptIf_postfix( false );

export const excptIfNotType = ( type: keyof typeof typeChecker, ...values: unknown[]) => {
  const check = typeChecker[type];
  values.forEach( value => {
    if ( !check( value ) )
      throw new ResException( 400, 'bad data' );
  });
};

