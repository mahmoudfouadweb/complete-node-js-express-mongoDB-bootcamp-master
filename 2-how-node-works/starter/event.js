const EventEmitter = require('events');
const http = require('http');

class Sale extends EventEmitter {
  constructor() {
    super();
  }
}

const myEmitter = new Sale();

myEmitter.emit('newSale');

myEmitter.on('mahmoud', () => console.log('There are sale!'));

myEmitter.on('mahmoud', (stock) =>
  console.log(`There are no stock but ${stock}`)
);

myEmitter.emit('mahmoud', 12);

/////////////////////////////////////////

const server = http.createServer();

server.on('request', (req, res) => {
  console.log('Request received');
  res.end('Request received');
});

server.on('request', (req, res) => {
  res.writeHead(200, {
    'Content-type': 'text/html'
  });
  console.log('Request received');
  res.end('<h1>Request received ❤</h1>');
});

server.on('close', () => {
  console.log('Server closed');
});

server.listen('8000', '127.0.0.1', () => {
  console.log('server on');
});
