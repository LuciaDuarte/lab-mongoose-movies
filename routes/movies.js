const express = require('express');
const Movie = require('./../models/movie');

const Moviesrouter = express.Router();

// Handle GET request for website root
Moviesrouter.get('/', (request, response, next) => {
  Movie.find()
    .then(movies => {
      response.render('movies/index', { movies });
    })
    .catch(error => {
      next(error);
    });
});

Moviesrouter.get('/create', (request, response, next) => {
  response.render('movies/create');
});

Moviesrouter.post('/create', (request, response, next) => {
  const data = request.body;

  Movie.create({
    title: data.title,
    genre: data.genre,
    plot: data.plot
  })
    .then(() => {
      response.redirect('/movies');
    })
    .catch(() => {
      response.render('movies/create');
    });
});

Moviesrouter.get('/:id', (request, response, next) => {
  const id = request.params.id;

  Movie.findById(id)
    .then(movie => {
      response.render('movies/show', { movie });
    })
    .catch(error => {
      next(error);
    });
});

Moviesrouter.post('/:id', (request, response, next) => {
  const id = request.params.id;

  const data = request.body;

  Movie.findByIdAndUpdate(id, {
    title: data.title,
    genre: data.genre,
    plot: data.plot
  })
    .then(() => {
      response.redirect('/movies');
    })
    .catch(error => {
      next(error);
    });
});

Moviesrouter.get('/:id/edit', (request, response, next) => {
  const id = request.params.id;

  Movie.findById(id)
    .then(movie => {
      response.render('movies/edit', { movie });
    })
    .catch(error => {
      next(error);
    });
});

Moviesrouter.post('/:id/delete', (request, response, next) => {
  const id = request.params.id;

  Movie.findByIdAndRemove(id)
    .then(() => {
      response.redirect('/movies');
    })
    .catch(error => {
      next(error);
    });
});

module.exports = Moviesrouter;
