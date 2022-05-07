const AlbumHandler = require('./handler');
const { albumsRouter } = require('../router');

module.exports = {
  name: 'album',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const album = new AlbumHandler(service, validator);
    server.route(albumsRouter(album));
  },
};
