const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

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

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
const results = tours.length;

// 2) ROUTE HANDLERS
// Handle GET request and make response
const allTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requistTime: req.requistTime,
    results,
    data: {
      tours
    }
  });
};

// Handle GET request and make response
const getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find(el => el.id === id);

  // if (id > tours.length) {
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      data: {
        message: 'Invalid page ID'
      }
    });
  }

  res.status(200).json({
    status: 'success me',
    data: {
      tour
    }
  });
};

// Handle PATCH request and make response
const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      data: {
        message: 'Invalid page ID'
      }
    });
  }

  res.status(200).json({
    status: 'succeess',
    data: {
      message: 'Update Done'
    }
  });
};

// Handle POST request and make response
const creatNewTour = (req, res) => {
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
};

// Handle DELETE request and make response
const deleteTour = (req, res) => {
  const id = req.params.id * 1;
  if (id > tours.length) {
    res.status(404).json({
      status: 'success',
      data: {
        message: 'Invalid page ID'
      }
    });
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
};

const users = JSON.parse(
  fs.readFileSync(`./dev-data/data/users.json`, 'utf-8', err => {
    if (err) {
      console.log(err);
    } else {
      console.log('Users loaded');
    }
  })
);
// console.log(users);

const allUsers = (req, res) => {
  console.log(req.body);

  res.status(200).json({
    status: 'success',
    data: {
      message: 'success'
    }
  });
};
const getUser = (req, res) => {
  const id = req.params.id * 1;
  console.log(id);
  const user = users.find(user => user.id === id);
  if (!user) {
    res.status(500).json({
      status: 'fail',
      message: 'id not found'
    });
  }
  console.log(user);
  res.status(200).json({
    status: 'success',
    lenght: users.length,
    data: {
      message: 'success'
    }
  });
};
const creatNewUser = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      message: 'success'
    }
  });
};
const updateUser = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      message: 'success'
    }
  });
};
const deleteUser = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      message: 'success'
    }
  });
};

// 3) ROUTS
// NOT A CLEAN CODE
// app.get('/api/v1/tours', allTours);
// app.post('/api/v1/tours', creatNewTour);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

// 3) ROUTS CELAN CODE
app.route('/api/v1/tours').get(allTours).post(creatNewTour);
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

app.route('/api/v1/users').get(allUsers).post(creatNewUser);
app
  .route('/api/v1/users/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

// 4) ERROR HANDLING
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
