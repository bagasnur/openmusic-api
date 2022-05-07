const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../errors/invariantError');
const NotFoundError = require('../errors/notFoundError');
const { mapSong, mapSongDetail } = require('../utilities/mapSongDB');

class songsService {
  constructor() {
    this._pool = new Pool();
  }

  async addSong({
    title, year, genre, performer, duration, albumId,
  }) {
    const id = `song-${nanoid(16)}`;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: 'INSERT INTO songs VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id',
      values: [
        id,
        title,
        year,
        genre,
        performer,
        duration,
        albumId,
        createdAt,
        updatedAt,
      ],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Gagal menambahkan lagu');
    }

    return result.rows[0].id;
  }

  async getSongs(title, performer) {
    if (title && performer) {
      const query = {
        text: 'SELECT * FROM songs WHERE LOWER(title) LIKE $1 AND LOWER(performer) LIKE $2',
        values: [`%${title}%`, `%${performer}%`],
      };
      const result = await this._pool.query(query);

      if (!result.rows.length) {
        throw new NotFoundError('Lagu tidak ditemukan');
      }

      return result.rows.map(mapSong);
    }

    if (title || performer) {
      const query = {
        text: 'SELECT * FROM songs WHERE LOWER(title) LIKE $1 OR LOWER(performer) LIKE $2',
        values: [`%${title}%`, `%${performer}%`],
      };
      const result = await this._pool.query(query);

      if (!result.rows.length) {
        throw new NotFoundError('Lagu tidak ditemukan');
      }

      return result.rows.map(mapSong);
    }

    const result = await this._pool.query('SELECT * FROM songs');
    return result.rows.map(mapSong);
  }

  async getSongById(id) {
    const query = {
      text: 'SELECT * FROM songs WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Lagu tidak ditemukan');
    }

    return result.rows.map(mapSongDetail)[0];
  }

  async editSongById(id, {
    title, year, genre, performer, duration, albumId,
  }) {
    const updatedAt = new Date().toISOString();
    const query = {
      text: 'UPDATE songs SET title = $1, year = $2, genre = $3, performer = $4, duration = $5, "albumId" = $6, updated_at = $7 WHERE id = $8 RETURNING id',
      values: [
        title,
        year,
        genre,
        performer,
        duration,
        albumId,
        updatedAt,
        id,
      ],
    };

    const result = await this._pool.query(query);
    console.log(result);
    if (!result.rows.length) {
      throw new NotFoundError('Lagu gagal diperbarui. Id tidak ditemukan');
    }
  }

  async deleteSongById(id) {
    const query = {
      text: 'DELETE FROM songs WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Lagu gagal dihapus. Id tidak ditemukan');
    }
  }
}

module.exports = songsService;
