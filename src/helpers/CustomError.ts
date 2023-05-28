export class CustomError extends Error {
    statusCode: number;
    is_success: boolean;

    constructor(message: string, statusCode: number) {
      super(message);
      this.statusCode = statusCode;
      this.name = this.constructor.name;
      this.is_success = false;

      Error.captureStackTrace(this, this.constructor);
    }
  
    static statusCodes = {
      OK: 200,
      BAD_REQUEST: 400, 
      UNAUTHORIZED: 401,
      NOT_FOUND: 404,
      INTERNAL_SERVER: 500,
    }
  
}