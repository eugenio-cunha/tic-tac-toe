'use strict';

module.exports = class Game {
  constructor(id, token) {
    this.id = id;
    this.token = token;
    this.matrix = Array(3)
      .fill(0)
      .map(() => Array(3).fill(null));
    this.plays = [];
  }

  movement(token, x, y, callback) {
    callback(null, { token, x, y });
  }
};
