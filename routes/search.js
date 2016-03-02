var express = require('express');
var search  = express.Router();
var db      = require('../db/pg');
var request        = require('request');

var dumpMethod = (req, res) => { res.send(req.method + ' DUMPED') }



search.route('/')
.get(db.showMovies, ( req,res) => {

  setTimeout(()=> { res.render('pages/search',{
    movieData: res.rows
  });},100)
})
.post( dumpMethod )



search.route('/:movieID')
.get( db.showMovies, (req,res) => {
  var extraData = [];

  var mID = req.params.movieID;
  if(!((mID -1) in res.rows)) {
    res.render('pages/error');
    return;
  }

  var newID = res.rows[mID-1].imdbid;
  request('http://omdbapi.com/?i='+ newID, function (error, response, body) {
    var parsedData = JSON.parse(body);
    extraData.push(parsedData);
  });

  setTimeout(()=>{ res.render('pages/profile', {
    movieID: mID,
    movieURL: '/search/' + mID,
    movieData: res.rows[mID-1],
    moreData: extraData[0]
  });},1000)
})



.delete( db.deleteMovie, (req, res) => {
  res.redirect('/search');
})


module.exports = search;