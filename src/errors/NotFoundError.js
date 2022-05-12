const ErrorClient = require('./ErrorClient');

class NotFoundError extends ErrorClient {
  constructor(message) {
    super(message, 404);
    this.name = 'ErrorNotFound';
  }
}

module.exports = NotFoundError;
