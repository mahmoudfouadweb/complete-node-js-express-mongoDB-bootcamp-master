const fs = require('fs');
const express = require('express');
const exp = require('constants');

const app = express();

// 1) MIDDLEWARES third party app
app.use(express.json());
// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'Hello From The Server', app: 'Natours' });
// });

// app.post('/', (req, res) => {
//   res.send('You can post to this endpont...');
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
const results = tours.length;

// Handle GET request and make response
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results,
    data: {
      tours
    }
  });
});

// Handle GET request and make response
app.get('/api/v1/tours/:id', (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find(el => el.id === id);

  // if (id > tours.length) {
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      data: {
        message: 'Invaid Page Number'
      }
    });
  }

  res.status(200).json({
    status: 'success me',
    data: {
      tour
    }
  });
});

// Handle POST request and make response
app.post('/api/v1/tours', (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour
        }
      });
    }
  );
});

const port = 8000;
app.listen(port, () => {
  console.log(`App Running on part ${port}`);
});
