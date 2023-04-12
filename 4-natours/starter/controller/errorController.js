const AppError = require('../util/appError');

const handleCastErrorDB = err => {
  const message = `Invail ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};
// JSON FORMATTING FOR Client ERRORS
const sendErrorDev = (err, res) => {
  // Operational, trusted error: send message to client
  res.status(err.statusCode).json({
    status: err.status,
    error: err
  });
};

// JSON FORMATTING FOR SERVER ERRORS
const sendErrorProd = (err, res) => {
  // Programming or other unknown error: don't leak error details to client. Show 500 internal server error.
  if (err.isOpreationError) {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      stack: err.stack,
      message: err.message
    });
  } else {
    // 1) log error
    console.log('Error 💥', err);
    // 2) Send generic message
    res.status(500).json({
      status: 'error',
      message: 'Somthing went very werong!'
    });
  }
};

// ERROR HANDLING FOR ALL ROUTES!!! NOT THE ONE THAT FAILS THE FIRST
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    console.log(error.name);
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    sendErrorProd(error, res);
  }
};
