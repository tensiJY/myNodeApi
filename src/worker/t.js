const { parentPort } = require(`worker_threads`);

parentPort.on(`message`, (data) => {
  console.log(`thread`);
  console.log(data);
});
