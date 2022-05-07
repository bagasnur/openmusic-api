const mapSong = ({
  id,
  title,
  performer,
}) => ({
  id,
  title,
  performer,
});

const mapSongDetail = ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  albumId,
}) => ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  albumId,
});

module.exports = { mapSong, mapSongDetail };
