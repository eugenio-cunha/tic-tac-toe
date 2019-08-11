'use strict';

const request = require('request');
const { expect, should } = require('chai');

describe('APP: tic-tac-toe', () => {
  const port = process.env.HTTP_PORT || 3000;
  const url = `http://0.0.0.0:${port}`;
  let id;
  let player;

  it(`${url}/game`, done => {
    request.post({ url: `${url}/game`, json: true }, (err, _res, body) => {
      should().not.exist(err);

      id = body.id;
      player = body.firstPlayer;

      expect(body).to.be.instanceOf(Object);
      expect(body.firstPlayer).to.be.oneOf(['X', 'O']);
      expect(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(body.id)).to.be.equal(
        true
      );
      done();
    });
  });

  it('Não é turno do jogador', done => {
    const body = {
      id,
      player: player === 'X' ? 'O' : 'X',
      position: {
        x: 0,
        y: 0
      }
    };
    request.post({ url: `${url}/game/${id}/movement`, body, json: true }, (err, res, body) => {
      should().not.exist(err);

      expect(body).to.be.deep.equal({
        msg: 'Não é turno do jogador'
      });
      done();
    });
  });

  it('Partida não encontrada', done => {
    const body = {
      id: '3776192a-632a-4988-afab-14941aa1835b',
      player: 'X',
      position: {
        x: 0,
        y: 1
      }
    };
    request.post(
      { url: `${url}/game/3776192a-632a-4988-afab-14941aa1835b/movement`, body, json: true },
      (err, res, body) => {
        should().not.exist(err);

        expect(body).to.be.deep.equal({ msg: 'Partida não encontrada' });
        done();
      }
    );
  });

  it('Status 200', done => {
    const body = {
      id,
      player,
      position: {
        x: 0,
        y: 2
      }
    };
    request.post({ url: `${url}/game/${id}/movement`, body, json: true }, (err, res, body) => {
      should().not.exist(err);

      should().not.exist(body);
      expect(res.statusCode).to.be.equal(200);
      done();
    });
  });

  it('Partida finalizada (Winner)', done => {
    const data = [
      {
        player: null,
        position: {
          x: 2,
          y: 1
        }
      },
      {
        player: null,
        position: {
          x: 0,
          y: 0
        }
      },
      {
        player: null,
        position: {
          x: 0,
          y: 1
        }
      },
      {
        player: null,
        position: {
          x: 1,
          y: 1
        }
      },
      {
        player: null,
        position: {
          x: 0,
          y: 2
        }
      },
      {
        player: null,
        position: {
          x: 2,
          y: 0
        }
      },
      {
        player: null,
        position: {
          x: 1,
          y: 2
        }
      },
      {
        player: null,
        position: {
          x: 2,
          y: 2
        }
      }
    ];

    request.post({ url: `${url}/game`, json: true }, (err, _res, body) => {
      should().not.exist(err);

      data[0].player = body.firstPlayer;
      const movement = data.map((e, i, a) => {
        i > 0 && (e.player = a[i - 1].player === 'X' ? 'O' : 'X');
        return e;
      });

      for (const value of movement) {
        request.post({ url: `${url}/game/${body.id}/movement`, body: value, json: true }, (err, _res, body) => {
          should().not.exist(err);

          if (body && body.winner) {
            expect(body.msg).to.be.equal('Partida finalizada');
            done();
          }
        });
      }
    });
  });

  it.skip('Partida finalizada (Draw)', done => {
    done();
  });
});
