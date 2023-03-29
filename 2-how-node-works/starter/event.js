const EventEmitter = require("events");

const myEmitter = new EventEmitter();

myEmitter.emit("newSale");

myEmitter.on("mahmoud", () => console.log("There are sale!"));

myEmitter.on("mahmoud", (stock) =>
  console.log(`There are no stock but ${stock}`)
);

myEmitter.emit("mahmoud", 12);
