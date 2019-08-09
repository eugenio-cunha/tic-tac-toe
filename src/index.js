'use strict';

const app = require('./app');

app.init(err => {
  if (err) throw err;

  // eslint-disable-next-line no-console
  console.info(`Ready! (${process.env.NODE_ENV || 3000})`);
});
