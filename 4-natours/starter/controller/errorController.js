module.exports = (err, req, res, next) => {
  // ERROR HANDLING FOR ALL ROUTES!!! NOT THE ONE THAT FAILS THE FIRST
  err.statusCode = err.statuscode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    // JSON FORMATTING FOR SERVER ERRORS
    status: err.status,
    message: err.message
  });
};
