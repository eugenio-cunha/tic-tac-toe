'use strict';

const app = require('../src/app');
const { should } = require('chai');

describe('APP: tic-tac-toe', () => {
  before(done => {
    app.init(err => {
      should().not.exist(err);

      done();
    });
  });

  require('./app');
  require('./robot');
});
