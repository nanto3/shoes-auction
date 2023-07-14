// TODO: 속성 private 처리
class ResException extends Error {
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

export default ResException;