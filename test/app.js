'use strict';

const http = require('http');
const app = require('../src/app');
const { expect, should } = require('chai');

describe('APP: tic-tac-toe', () => {
  let id;
  const port = process.env.HTTP_PORT || 3000;
  const request = (args, callback) => {
    args = {
      body: {},
      port: port,
      hostname: '0.0.0.0',
      headers: {
        'Content-Type': 'application/json'
      },
      ...args
    };
    const req = http.request(args, res => {
      let chunks = '';

      res.setEncoding('utf8');
      res.on('data', chunk => {
        chunks += chunk;
      });

      res.on('end', () => {
        callback(null, JSON.parse(chunks));
      });
    });
    req.write(JSON.stringify(args.body));
    req.end();
  };

  before(done => {
    app.init(err => {
      should().not.exist(err);

      done();
    });
  });

  it(`http://0.0.0.0:${port}/game`, done => {
    request({ path: '/game', method: 'POST' }, (err, res) => {
      should().not.exist(err);

      expect(res).to.be.instanceOf(Object);
      expect(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(res.id)).to.be.equal(true);
      id = res.id;

      done();
    });
  });

  it(`http://0.0.0.0:${port}/game/:id/movement`, done => {
    const body = {
      id,
      player: 'X',
      position: {
        x: 0,
        y: 1
      }
    };
    request({ path: `/game/${id}/movement`, method: 'POST', body }, (err, res) => {
      should().not.exist(err);

      console.log('>>>>', res);

      done();
    });
  });

  // POST - /game/{id}/movement
});
