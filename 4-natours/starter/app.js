const fs = require('fs');
const express = require('express');

const app = express();

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

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success', 
    results,
    tours, 
  })
});
const port = 8000;
app.listen(port, () => {
  console.log(`App Running on part ${port}`);
});
