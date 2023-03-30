// console.log(arguments);
// console.log(require('module'));

const calculater = require('./test-module');

const calc1 = new calculater();

// const add = calc1.add(5, 5);
// console.log(add);

const { add, devide, multiply } = require('./test-module2');
console.log(add(4, 4));

const hi = require('./test-module3')
 hi('💥')
 hi('😂')
 hi('🤣')
