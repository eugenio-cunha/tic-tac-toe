'use strict';

/**
 * @description Classe do jogo
 */
module.exports = class Game {
  constructor(id, symbol) {
    this.id = id;
    this.player = symbol.toUpperCase();
    this.matrix = Array(3)
      .fill(0)
      .map(() => Array(3).fill(0));
    this.round = 0;
    this.winner = null;
  }

  /**
   * @description Marca uma posição no jogo
   * @param {String} player Simbolo do jogador X ou O
   * @param {Integer} x indice da coluna
   * @param {Integer} y indice da linha
   * @param {Function} callback chamada de retorno `(err, res) => {};`
   */
  movement(player, x, y, callback) {
    if (this.player !== player) return callback({ msg: 'Não é turno do jogador' });

    // Começando do índice 0, no canto inferior esquerdo. (Bitwise XOR)
    x = x !== 1 ? x ^ 2 : x;
    y = y !== 1 ? y ^ 2 : y;

    if (!this.validMove(x, y)) return callback({ msg: 'Não é um movimento válido' });

    ++this.round;
    this.player = player.toUpperCase() === 'X' ? 'O' : 'X';
    this.matrix[y][x] = player.toUpperCase() === 'X' ? -1 : 1;

    this.evaluate(callback);
  }

  /**
   * @description Avalia o resultado do jogo
   * @param {Function} callback chamada de retorno `(err, res) => {};`
   */
  evaluate(callback) {
    if (this.diagonal() || this.column() || this.row()) {
      this.winner = this.player;
      return callback(null, {
        msg: 'Partida finalizada',
        winner: this.player
      });
    } else if (this.round === 9) {
      this.winner = 'Draw';
      return callback(null, {
        status: 'Partida finalizada',
        winner: 'Draw'
      });
    }
    callback();
  }

  /**
   * @description Avalia o resultado da diagonais da matriz
   * @returns {Boolean} verdadeiro caso uma da diagonais estejam iguais
   */
  diagonal() {
    const d1 = this.matrix.map((a, i) => a[i]).reduce((t, c) => t + c);
    const d2 = this.matrix.map((a, i) => [...a].reverse()[i]).reduce((t, c) => t + c);

    return [d1, d2].some(e => Math.abs(e) === 3);
  }

  /**
   * @description Avalia o resultado das linhas da matriz
   * @returns {Boolean} verdadeiro caso uma da linhas estejam iguais
   */
  row() {
    const result = this.matrix.reduce((a, b) => a.map((v, i) => v + b[i]));
    return result.some(e => Math.abs(e) === 3);
  }

  /**
   * @description Avalia o resultado das colunas da matriz
   * @returns {Boolean} verdadeiro caso uma da colunas estejam iguais
   */
  column() {
    const result = this.matrix.map(a => a.reduce((t, c) => t + c));
    return result.some(e => Math.abs(e) === 3);
  }

  /**
   * @description Testa se o movimento é válido
   * @param {Integer} x indice da coluna
   * @param {Integer} y indice da linha
   */
  validMove(x, y) {
    return this.matrix[y][x] === 0 && x >= 0 && x <= 2 && y >= 0 && y <= 2;
  }
};
