const express = require('express');
const router = express.Router();

//models
const Movie = require('../Models/Movie'); 

/* GET movies listing. */

router.get('/', (req,res) => {
  const promise = Movie.aggregate([
    {
      $lookup: {
        from: 'directors',
        localField: 'director_id',
        foreignField: '_id',
        as: 'director'
      }
    },
    {
      $unwind: '$director'
    }
  ]);
  promise
  .then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  })
});

router.get('/between/:start_year/:end_year', (req,res) => {
  const { start_year, end_year } = req.params;

  const promise = Movie.find({
    year: { "$gte": parseInt(start_year), "$lte": parseInt(end_year)}
  });
  promise
  .then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  })
});

// '/api/movies/top10' top 10 sıralanır
router.get('/top10', (req,res, next) => {
  const movie_id = req.params.movie_id;
  const promise = Movie.find({}).limit(10).sort({imdb_score: -1});
  promise
  .then((movie) => {
    if(!movie){
      next({message:" The movie not found", code: 99});
    }
    
    res.json(movie);
  }).catch((err) => {
    res.json(err);
  })
});
// '/api/movies/:movie_id' 
router.get('/:movie_id', (req,res, next) => {
  const movie_id = req.params.movie_id;
  const promise = Movie.findById(movie_id);
  promise
  .then((movie) => {
    if(!movie){
      next({message:" The movie not found", code: 99});
    }
    
    res.json(movie);
  }).catch((err) => {
    res.json(err);
  })
});

// '/api/movies/:movie_id' update 

router.put('/:movie_id', (req,res, next) => {
  const movie_id = req.params.movie_id;
  req.body.updatedAt = new Date();
  const promise = Movie.findByIdAndUpdate(movie_id, req.body,{new: true});
  promise
  .then((movie) => {
    if(!movie){
      next({message:" The movie not found", code: 99});
    }
    res.json(movie);
  }).catch((err) => {
    res.json(err);
  })
});

// '/api/movies/:movie_id' delete
router.delete('/:movie_id', (req,res, next) => {
  const movie_id = req.params.movie_id;
  const promise = Movie.findByIdAndRemove(movie_id);
  promise
  .then((movie) => {
    if(!movie){
      next({message:" The movie not found", code: 99});
    }
    
    res.json({status: 1});
  }).catch((err) => {
    res.json(err);
  })
});

router.post('/', (req, res, next) => {
  const {title, imdb_score, category, country, year, director_id } = req.body;
  console.log(req.body,"----");
  //const Movie = new Movie(req.body); şeklinde kullanım mevcut. Tüm fieldları bu şekilde çeker.
  const movie = new Movie({
    title: title,
    imdb_score: imdb_score,
    category: category,
    country: country,
    year: year,
    director_id: director_id
  });
  /*movie.save((err, data) => {
    if(err){
      res.json(err);
    }
    res.json({message: "Film başarıyla eklendi", status: 1});
  });*/
  const promise = movie.save();

  promise
  .then(() => {
    res.json({message: "Film başarıyla eklendi", status: 1});
  }).catch((err) => {
    res.json(err);
  })

});

module.exports = router;
