require('dotenv').config();

const hapi = require('@hapi/hapi');
const songs = require('./api/songs');
const SongsService = require('./services/SongsService');
const SongsValidator = require('./validator/songs');
const albums = require('./api/albums');
const AlbumsService = require('./services/AlbumsService');
const AlbumsValidator = require('./validator/albums');

const startServer = async () => {
  const songsService = new SongsService();
  const albumService = new AlbumsService();

  const server = hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: songs,
      options: {
        service: songsService,
        validator: SongsValidator,
      },
    },
    {
      plugin: albums,
      options: {
        service: albumService,
        validator: AlbumsValidator,
      },
    },
  ]);

  console.log(`[${server.info.id}] Starting server... \n+`);
  await server.start();
  console.log(`[SERVER] Started at ${server.info.uri}`);
};

startServer();
