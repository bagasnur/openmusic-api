const SongHandler = require('./handler');
const { songsRouter } = require('../router');

module.exports = {
  name: 'song',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const song = new SongHandler(service, validator);
    server.route(songsRouter(song));
  },
};
