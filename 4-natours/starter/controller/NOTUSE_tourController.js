const { errorHandlerPageNotFound } = require('./errorController');

// as a refrence how to readfile system
// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );
// const results = tours.length;

// how the third party should work
// exports.checkId = (req, res, next, val) => {
//   if (req.params.id * 1 > tours.lenght) return errorHandlerPageNotFound(res);
//   next();
// };

// explain how middleware works
// exports.checkBody = (req, res, next) => {
//   const { name, price } = req.body;
//   if (!name || !price) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'bad request'
//     });
//   }
//   res.status(200).json({
//     status: 'success',
//     message: 'done'
//   });
//   next();
// };

// Handle GET request and make response
exports.allTours = (req, res) => {
  // res.status(200).json({
  //   status: 'success',
  //   requistTime: req.requistTime,
  //   results,
  //   data: {
  //     tours
  //   }
  // });
};

// Handle GET request and make response
exports.getTour = (req, res) => {
  const id = req.params.id * 1;
  // const tour = tours.find(el => el.id === id);
  // // Error Handler
  // if (!tour) return errorHandlerPageNotFound(res);

  // res.status(200).json({
  //   status: 'success me',
  //   data: {
  //     tour
  //   }
  // });
};

// Handle PATCH request and make response
exports.updateTour = (req, res) => {
  // if (req.params.id * 1 > tours.length) return errorHandlerPageNotFound(res);

  res.status(200).json({
    status: 'succeess',
    data: {
      message: 'Update Done'
    }
  });
};

// Handle POST request and make response
exports.creatNewTour = (req, res) => {
  // const newId = tours[tours.length - 1].id + 1;
  // const newTour = Object.assign({ id: newId }, req.body);
  // tours.push(newTour);
  // res.status(201).json({
  //   status: 'success',
  //   data: {
  //     tour: newTour
  //   }
  // });
};

// Handle DELETE request and make response
exports.deleteTour = (req, res) => {
  const id = req.params.id * 1;
  // if (id > tours.length) return errorHandlerPageNotFound(res);

  res.status(204).json({
    status: 'success',
    data: null
  });
};
