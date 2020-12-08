/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
const fetch = require('node-fetch');
const fs = require('fs');
const BASE_URL_PROD = 'https://cloud.iexapis.com/stable/ref-data';
const token = 'TOKEN';

const saveDataTofile = async (baseURL, path, API_KEY, fileName) => {
  const URL = `${baseURL}/${path}?token=${API_KEY}`;
  const res = await fetch(URL);
  const data = await res.json();
  if (path.includes('fx')) {
    writeCSV(fileName, data.currencies, 'stock', fileName);
  } else {
    writeCSV(fileName, data, 'stock', fileName);
  }
};

const writeCSV = (fileName, jsonData, type) => {
  const streamWriter = fs.createWriteStream(fileName, {flags: 'a'});
  streamWriter.write('symbol,name,type\n');
  for (let obj of jsonData) {
    streamWriter.write(`${obj.symbol},${obj.name},${type}\n`);
  }
  streamWriter.close();
};

saveDataTofile(BASE_URL_PROD, 'symbols', token, './stocks.csv');
saveDataTofile(BASE_URL_PROD, 'crypto/symbols', token, './crypto.csv');
saveDataTofile(BASE_URL_PROD, 'fx/symbols', token, './fx.csv');
