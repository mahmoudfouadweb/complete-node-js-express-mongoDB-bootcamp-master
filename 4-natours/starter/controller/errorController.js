module.exports.errorHandlerPageNotFound = res =>
  res.status(404).json({
    status: 'fail',
    data: {
      message: 'Invalid page ID 💥'
    }
  });
