module.exports.errorHandlerPageNotFound = res =>{
return  res.status(404).json({
    status: 'fail',
    data: {
      message: 'Invalid page ID 💥'
    }
  })};