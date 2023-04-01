const express = require('express');
const morgan = require('morgan');

const userRouters = require('./routers/usersRoutes');
const tourRouters = require('./routers/toursRoutes');

const app = express();

// 1) MIDDLEWARES third party app
app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next) => {
  console.log('Hello from middleware 👋');
  next();
});

app.use((req, res, next) => {
  req.requistTime = new Date().toISOString();
  next();
});

// 3) ROUTS CELAN CODE
app.use('/api/v1/tours', tourRouters);
app.use('/api/v1/users', userRouters);

//3.5) ERROR HANDLING
app.use((err, req, res, next) => {
  res.status(500).json({
    status: 'error',
    data: { message: err.message || 'Internal Server Error' }
  });
});

// 4) START THE SERVER
const port = 8000;
app.listen(port, () => {
  console.log(`App Running on part ${port}`);
});
