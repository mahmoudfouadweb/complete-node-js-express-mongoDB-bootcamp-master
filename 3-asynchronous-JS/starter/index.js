const { rejects } = require("assert");
const fs = require("fs");
const { resolve } = require("path");
const superagent = require("superagent");

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

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) return reject('ERR');
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, rejects) => {
    fs.writeFile(file, data, (err) => {
      if (err)  rejects('ERR');
      resolve("Success");
    });
  });
};

// readFilePro(`${__dirname}/dog.txt`)
//   .then((res) =>
//     superagent.get(`https://dog.ceo/api/breed/${res}/imaes/random`)
//   )
//   .then((res) => console.log(">>>>>>>", res.body))
//   .then(() => console.log("Done")).catch(err=> console.log('<<<<<<<<<<',err.message));

const dog = async () => {
  const data = await readFilePro(`${__dirname}/dog.txt`);
  const res = await superagent.get(
    `https://dog.ceo/api/breed/${data}/imaes/random`
  );
  await writeFilePro(`./dog-image.txt`, res.body.message);
};

dog();
