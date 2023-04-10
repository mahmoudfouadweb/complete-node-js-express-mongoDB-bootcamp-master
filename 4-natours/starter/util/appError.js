class AppError extends Error {
  constructor(message, statusCode) {
    super(message); // Call the "Error" constructor, then pass in the message and statusCode as the arguments. This automatically attaches the prototype from the Error class
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true; // This will cause the error type to be visible in the GraphQL server's "errors" array on the GraphQL schema. Learn more about
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
