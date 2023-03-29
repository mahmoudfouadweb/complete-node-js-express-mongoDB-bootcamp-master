const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  // solution one
  // fs.readFile('./test-file.txt', 'utf-8', (err, data) => {
  //   if (err) console.log(err);
  //   res.end(data);
  // });
  
  // solution two: Stream
  const readable = fs.createReadStream('test-file.txt')
  readable.on('data', chunk => {
    res.write(chunk)
  })
  readable.on('end', () => {
    res.end()
  })
});

server.listen(8000, 'localhost', () => {
  console.log('Server Is Running Now');
});
