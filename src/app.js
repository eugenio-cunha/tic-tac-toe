'use strict';

const cors = require('cors');
const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const server = express();

exports.init = callback => {
  server.disable('x-powered-by');
  server.disable('etag');

  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());
  server.use(cors());

  server.use('/', routes);

  server.listen(process.env.HTTP_PORT || 3000, callback);
};
