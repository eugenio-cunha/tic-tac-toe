'use strict';

const uuid = require('uuid/v4');
const { cache, Game } = require('../lib');

exports.game = (_req, res) => {
  const id = uuid();
  const token = Math.floor(Math.random() * Math.floor(2)) ? 'x' : 'o';

  cache.set(id, new Game(id, token), err => {
    if (err) return res.sendStatus(500).json({ error: err });

    res.json({ id, firstPlayer: token });
  });
};

exports.movement = (req, resp) => {
  const { id } = req.params;
  cache.get(id, (err, game) => {
    game.movement('X', 0, 1, (err, res) => {
      resp.json(res);
    });
  });
};

// Caso a jogada seja feita com sucesso o código 200 deve ser retornado.

// Caso não seja o turno do jogador, ou a partida não exista, um erro deve ser retornado.
// {
//   "msg": "Não é turno do jogador"
// }

// Partida Inexistente
// {
//   "msg": "Partida não encontrada"
// }

// Finalmente se o jogo chegar ao fim o retorno deve ser assim:
// {
//   "msg": "Partida finalizada",
//   "winner": "X"
// }

// Se o jogo deu velha (empate), o campo jogador ganhador deve vir preenchido da seguinte forma:
// {
//   "status": "Partida finalizada",
//   "winner": "Draw"
// }
