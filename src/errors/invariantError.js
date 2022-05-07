const errorClient = require('./errorClient');

class invariantError extends errorClient {
  constructor(message) {
    super(message);
    this.name = 'ErrorInvariant';
  }
}

module.exports = invariantError;
