const ErrorClient = require('./ErrorClient');

class InvariantError extends ErrorClient {
  constructor(message) {
    super(message);
    this.name = 'ErrorInvariant';
  }
}

module.exports = InvariantError;
