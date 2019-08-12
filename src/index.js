'use strict';

const app = require('./app');

/**
 * @description Inicializa a aplicação
 */
app.init(err => {
  if (err) throw err;

  // eslint-disable-next-line no-console
  console.info(`Ready! http://0.0.0.0:${process.env.HTTP_PORT || 3000}`);
});
