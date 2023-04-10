const express = require('express');
const morgan = require('morgan');

const userRouters = require('./routers/usersRoutes');
const tourRouters = require('./routers/toursRoutes');

/* -------------------------- Express JS Begin here ------------------------- */
const app = express();

// 1) MIDDLEWARES third party app
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => next());
app.use((req, res, next) => {
  req.requistTime = new Date().toISOString();
  next();
});

// 2) ROUTS *CELAN CODE*
app.use('/api/v1/tours', tourRouters);
app.use('/api/v1/users', userRouters);

app.all('*', (req, res, next) => {
  // res.status(404).send({
  //   staus: 'fail',
  //   message: `Can't find ${req.originalUrl} on this server`
  // });
  const err = new Error(`Can't find ${req.originalUrl} on this server`);
  err.status = 404; // set the error status code to 404 (Not Found)
  err.statusCode = 'fail';
  next(err);
});

//3) ERROR HANDLING
app.use((err, req, res, next) => {
  // ERROR HANDLING FOR ALL ROUTES!!! NOT THE ONE THAT FAILS THE FIRST
  err.statusCode = err.statuscode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    // JSON FORMATTING FOR SERVER ERRORS
    status: err.status,
    message: err.message
  });
});

module.exports = app;
