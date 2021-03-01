const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');

const csvData = fs
  .readFileSync(
    path.join(
      __dirname,
      '..',
      '..',
      'db',
      'sources',
      'regije.csv',
    ),
    'utf8',
  );

const states = Papa.parse(csvData, {
  header: true,
});

module.exports = states
  .data
  .map(({ state: name, code }) => ({
    name,
    code,
  }));