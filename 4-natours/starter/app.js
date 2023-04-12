const express = require('express');
const morgan = require('morgan');

const AppError = require('./util/appError');
const globalErrorHandler = require('./controller/errorController');
const tourRouters = require('./routers/toursRoutes');
const userRouters = require('./routers/usersRoutes');

/* -------------------------- Express JS Begin here ------------------------- */
const app = express();

// 1) MIDDLEWARES third party app
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
  req.requistTime = new Date().toISOString();
  next();
});

// 2) ROUTS *CELAN CODE*
app.use('/api/v1/tours', tourRouters);
app.use('/api/v1/users', userRouters);

app.all('*', (req, res, next) =>
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
);

//3) ERROR HANDLING
app.use(globalErrorHandler);

module.exports = app;
