'use strict';

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

  movement(symbol, x, y, callback) {
    if (this.player !== symbol) return callback({ msg: 'Não é turno do jogador' });
    if (!this.validMove(x, y)) return callback({ msg: 'Não é movimento válido' });

    ++this.round;
    this.player = symbol.toUpperCase() === 'X' ? 'O' : 'X';
    this.matrix[x][y] = symbol.toUpperCase() === 'X' ? -1 : 1;

    this.evaluate(callback);
  }

  evaluate(callback) {
    if (this.diagonal() || this.horizontal() || this.vertical()) {
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

  diagonal() {
    const d1 = this.matrix.map((a, i) => a[i]).reduce((t, c) => t + c);
    const d2 = this.matrix.map((a, i) => [...a].reverse()[i]).reduce((t, c) => t + c);

    return [d1, d2].some(e => Math.abs(e) === 3);
  }

  vertical() {
    const result = this.matrix.reduce((a, b) => a.map((v, i) => v + b[i]));
    return result.some(e => Math.abs(e) === 3);
  }

  horizontal() {
    const result = this.matrix.map(a => a.reduce((t, c) => t + c));
    return result.some(e => Math.abs(e) === 3);
  }

  validMove(x, y) {
    return x >= 0 && x <= 2 && y >= 0 && y <= 2 && this.matrix[x][y] === 0;
  }
};
