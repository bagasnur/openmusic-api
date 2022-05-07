const errorClient = require('./errorClient');

class notFoundError extends errorClient {
  constructor(message) {
    super(message, 404);
    this.name = 'ErrorNotFound';
  }
}

module.exports = notFoundError;
