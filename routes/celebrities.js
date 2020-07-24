const express = require('express');
const Celebrity = require('./../models/celebrity');

const Celebsrouter = express.Router();

// Handle GET request for website root
Celebsrouter.get('/', (request, response, next) => {
  Celebrity.find()
    .then(celebrities => {
      response.render('celebrities/index', { celebrities });
    })
    .catch(error => {
      next(error);
    });
});

Celebsrouter.get('/create', (request, response, next) => {
  response.render('celebrities/create');
});

Celebsrouter.post('/create', (request, response, next) => {
  const data = request.body;

  Celebrity.create({
    name: data.name,
    occupation: data.occupation,
    catchPhrase: data.catchPhrase
  })
    .then(() => {
      response.redirect('/celebrities');
    })
    .catch(() => {
      response.render('/celebrities/create');
    });
});

Celebsrouter.get('/:id', (request, response, next) => {
  const id = request.params.id;

  Celebrity.findById(id)
    .then(celebrity => {
      console.log(celebrity);
      response.render('celebrities/show', { celebrity });
    })
    .catch(error => {
      next(error);
    });
});

Celebsrouter.post('/:id', (request, response, next) => {
  const id = request.params.id;

  const data = request.body;

  Celebrity.findByIdAndUpdate(id, {
    name: data.name,
    occupation: data.occupation,
    catchPhrase: data.catchPhrase
  })
    .then(() => {
      response.redirect('/celebrities');
    })
    .catch(error => {
      next(error);
    });
});

Celebsrouter.get('/:id/edit', (request, response, next) => {
  const id = request.params.id;

  Celebrity.findById(id)
    .then(celebrity => {
      response.render('celebrities/edit', { celebrity });
    })
    .catch(error => {
      next(error);
    });
});

Celebsrouter.post('/:id/delete', (request, response, next) => {
  const id = request.params.id;

  Celebrity.findByIdAndRemove(id)
    .then(() => {
      response.redirect('/celebrities');
    })
    .catch(error => {
      next(error);
    });
});

module.exports = Celebsrouter;
