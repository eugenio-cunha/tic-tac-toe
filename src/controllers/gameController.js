'use strict';

const uuid = require('uuid/v4');
const { cache, Game } = require('../lib');

exports.game = (_req, res) => {
  const id = uuid();
  const symbol = Math.floor(Math.random() * Math.floor(2)) ? 'X' : 'O';

  cache.set(id, new Game(id, symbol), err => {
    if (err) return res.status(500).json({ msg: err });

    res.json({ id, firstPlayer: symbol });
  });
};

exports.movement = (req, resp) => {
  const { id } = req.params;
  const { player, position } = req.body;

  cache.get(id, (err, game) => {
    if (err || !game) return resp.status(404).json({ msg: 'Partida não encontrada' });

    game.movement(player, position.x, position.y, (err, res) => {
      if (err) return resp.status(400).json(err);

      if (res && res.winner) cache.del(id);

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
