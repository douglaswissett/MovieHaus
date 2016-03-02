var express        = require('express');
var logger         = require('morgan');
var request        = require('request');
var bodyParser     = require('body-parser');
var favicon        = require('serve-favicon');
var path           = require('path');
var methodOverride = require('method-override');
var app            = express();
var db             = require('./db/pg');
var dotenv         = require('dotenv');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(favicon(__dirname + '/public/favicon.ico'));
app.set('view engine', 'ejs');

dotenv.load();

// Routes
app.get('/', db.showMovies, (req, res) => {
  res.render('pages/home', {data: res.rows});
});


// search route
app.use('/search', require(path.join(__dirname, '/routes/search')));


// OMDB route
app.get('/movies', (req, res) => {
  movies = [];
  var title = req.query.s;

  if( !title ) {
    // redirect if search movie field is submitted empty
    res.redirect('/search');
    return;
  }
  request('http://omdbapi.com/?s='+ title, function (error, response, body) {
    var parsedMovies = JSON.parse(body);

    if(parsedMovies.Response === 'False') {
      res.render('pages/error');
      return;
    }

    parsedMovies['Search'].forEach(function(movie) {
      movies.push(movie);
    });

    res.render('pages/movies', {
      movieData: movies
    });
  });

});

app.post('/movies', db.addMovie, (req,res)=>{
  res.redirect('/search');
})




var port = process.env.PORT || 3000;
app.listen(port, () => console.log('Server Up and Running! Port: ', port, '//', new Date()));