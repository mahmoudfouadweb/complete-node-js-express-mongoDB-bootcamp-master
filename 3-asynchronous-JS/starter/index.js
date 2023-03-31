const fs = require('fs');
const http = require('http');
const superagent = require('superagent');

// fs.readFile(`${__dirname}/dog.txt`, "utf-8", (err, data) => {
//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .end((err, { body }) => {
//       if (err) return console.log(err.message);
//       fs.writeFile(`dog-img.txt`, body.message, (err) => {
//         if (err) return console.log(err.message);
//         console.log("Random dog image saved to file!");
//       });
//     });
// });

const readFilePro = file =>
  new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not find that file 😢');
      resolve(data);
    });
  });

const writeFilePro = (file, data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
      if (err) reject('Could not write file 😢');
      resolve('success');
    });
  });

// readFilePro(`${__dirname}/dog.txt`)
//   .then((res) =>
//     superagent.get(`https://dog.ceo/api/breed/${res}/imaes/random`)
//   )
//   .then((res) => console.log(">>>>>>>", res.body))
//   .then(() => console.log("Done")).catch(err=> console.log('<<<<<<<<<<',err.message));
// const dog = async () => {
//   try {
//     const data = await readFilePro(`${__dirname}/dog.txt`);
//     const res = await superagent.get(
//       `https://dog.ceo/api/breed/${data}/images/random`
//     );
//     // console.log(res.body.message);
//     await writeFilePro(`./dog-img.txt`, res.body.message);
//   } catch (err) {
//     console.log(err);
//     throw err;
//   }
// };

// dog();

http.createServer((req, res) => {
  fs.readFile('/.dog-img.txt', 'utf-8', (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    } else {
      const imgPath = data.trim();
      // console.log(imgPath);
      fs.readFile(imgPath)
      
    }
  });
}).listen(8000, 'localhost', () => {
  console.log('Server Is Running');
});
