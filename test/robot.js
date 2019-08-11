'use strict';

const request = require('request');
const { expect, should } = require('chai');

const data = require('./data.json');
const port = process.env.HTTP_PORT || 3000;
const url = `http://0.0.0.0:${port}`;

describe('1000 Games', () => {
  data.forEach((e, i) => {
    describe(`Game ${i}`, () => {
      let id;
      let player;

      before(done => {
        request.post({ url: `${url}/game`, json: true }, (err, _res, body) => {
          should().not.exist(err);

          id = body.id;
          player = body.firstPlayer;
          done();
        });
      });

      e.movement.forEach((m, i) => {
        it(`Movement ${i} (x:${m.position.x}, y${m.position.y})`, done => {
          request.post({ url: `${url}/game/${id}/movement`, body: { ...m, player }, json: true }, (err, _res, body) => {
            should().not.exist(err);

            if (body) expect(e.winner ? body.msg : body.status).to.be.equal('Partida finalizada');
            player = player === 'X' ? 'O' : 'X';

            done();
          });
        });
      });
    });
  });
});
