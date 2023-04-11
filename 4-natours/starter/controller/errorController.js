// JSON FORMATTING FOR Client ERRORS
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err
  });
};

// JSON FORMATTING FOR SERVER ERRORS
const sendErrorProd = (err, res) => {
  if (err.isOpreationError) {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      stack: err.stack,
      message: err.message
    });
  } else {
    res.statu(500).json({ status: 'error', error: err, message: err.message });
  }
};

// ERROR HANDLING FOR ALL ROUTES!!! NOT THE ONE THAT FAILS THE FIRST
module.exports = (err, req, res, next) => {
  err.statusCode = err.statuscode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    sendErrorProd(err, res);
  }
};
