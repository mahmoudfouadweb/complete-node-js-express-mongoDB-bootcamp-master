const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  // solution one
  // fs.readFile('./test-file.txt', 'utf-8', (err, data) => {
  //   if (err) console.log(err);
  //   res.end(data);
  // });

  // solution two: Stream
  // const readable = fs.createReadStream('test-file.txt');
  // readable.on('data', chunk => {
  //   res.write(chunk);
  // });

  // readable.on('end', () => {
  //   res.end();
  // });

  // readable.on('error', err => {
  //   console.log(err);
  //   res.statusCode = 500;
  //   res.end('No such file found!!');
  // });
  
  // solution three : Pipe
  const readable = fs.createReadStream('./test-file.txt', 'utf-8')
  readable.pipe(res)
  res.statusCode = 201;
});

server.listen(8000, 'localhost', () => {
  console.log('Server Is Running Now');
});
