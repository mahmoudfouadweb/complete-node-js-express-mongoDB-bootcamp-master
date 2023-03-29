const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  // solution one
  fs.readFile('./test-file.txt', 'utf-8', (err, data) => {
    if (err) console.log(err);
    res.end(data);
  });
});

server.listen(8000, 'localhost', () => {
  console.log('Server Is Running Now');
});
