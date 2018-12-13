console.log('keys.js is loaded');

var spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

var omdb = {
    key: process.env.OMDB_API
  };

var bandsintown = {
    key: process.env.BIT_App_ID
};

module.exports= {
    spotify: spotify,
    omdb: omdb,
    bandsintown: bandsintown
}