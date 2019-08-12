'use strict';

const request = require('request');
const { expect, should } = require('chai');

const data = require('./data.json');
const port = process.env.HTTP_PORT || 3000;
const url = `http://0.0.0.0:${port}`;

describe('1000 Games', () => {
  data.forEach((e, i) => {
    describe(`Game ${i} (${e.winner ? 'Winner' : 'Draw'})`, () => {
      before(done => {
        request.post({ url: `${url}/game`, json: true }, (err, _res, body) => {
          should().not.exist(err);

          e.id = body.id;
          e.movement[0].player = body.firstPlayer;
          e.movement = e.movement.map((e, i, a) => {
            i > 0 && (e.player = a[i - 1].player === 'X' ? 'O' : 'X');
            return e;
          });
          done();
        });
      });

      e.movement.forEach((m, i) => {
        it(`Movement ${i} => (x:${m.position.x}, y${m.position.y})`, done => {
          request.post({ url: `${url}/game/${e.id}/movement`, body: m, json: true }, (err, _res, body) => {
            should().not.exist(err);

            if (body) expect(e.winner ? body.msg : body.status).to.be.equal('Partida finalizada');

            done();
          });
        });
      });
    });
  });
});
