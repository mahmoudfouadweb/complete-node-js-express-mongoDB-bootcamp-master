// Blocking, synchronous way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8')
// console.log(textIn);
// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`
// fs.writeFileSync('./txt/output.txt', textOut)

// Non-Blocking, asynchonous way
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   fs.readFile(`./txt/${data1}`, "utf-8", (err, data2) => {
//     fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
//       fs.writeFile(`./txt/final.txt`, `${data1}\n ${data3}`, "utf-8", (err) => {
//         // console.log('Your file hase been done 🌹');
//       });
//     });
//   });
// });
// console.log('second');
