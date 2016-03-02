'use strict'
var pg = require('pg');

if(process.env.ENVIRONMENT === 'production') {
  var conString = process.env.DATABASE_URL;  
} else {
  var conString = "postgres://"+process.env.DB_USER+":"+ process.env.DB_PASS +"@"+process.env.DB_HOST+"/"+process.env.DB_NAME+"";
}


function showMovies(req, res, next) {
  pg.connect(conString, function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('SELECT * FROM movies', function(err, result) {
      done();

      if(err) {
        return console.error('error running query', err);
      }
      res.rows = result.rows;
      next();
    });
  });
}

function addMovie(req, res, next) {
  pg.connect(conString, function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('INSERT INTO movies (title,year,img_url,showtimes,imdbID) VALUES ($1, $2, $3, $4, $5)',
     [req.body.title, req.body.year, req.body.poster, req.body.showTimes, req.body.imdbID], 
     function(err, result) {
      done();

      if(err) {
        return console.error('error running query', err);
      }
      next();
    });
  });
}

function deleteMovie(req, res, next) {
  var movieID = req.body.movieID;

  pg.connect(conString, function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('DELETE FROM movies WHERE ID =' + movieID +'',
     function(err, result) {
      done();

      if(err) {
        return console.error('error running query', err);
      }
      next();
    });
  });
}



module.exports.showMovies = showMovies;
module.exports.addMovie = addMovie;
module.exports.deleteMovie = deleteMovie;