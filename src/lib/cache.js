'use strict';

const cache = new Map();

/**
 * @description Adiciona uma nova partida
 *
 * @param {String} id chave do jogo
 * @param {Object} game jogo
 * @param {Function} callback chamada de retorno `(err, res) => {};`
 */
exports.set = (id, game, callback) => {
  if (!id || !game) return callback('id/game cannot be null');
  cache.set(id, game);

  callback && callback();
};

/**
 * @description Obtem uma partida
 *
 * @param {String} id chave da jogo
 * @param {Function} callback chamada de retorno `(err, res) => {};`
 */
exports.get = (id, callback) => {
  if (!cache.has(id)) return callback('game not found');

  callback(null, cache.get(id));
};
