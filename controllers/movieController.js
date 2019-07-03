const Movie = require('../models/movie');

//Note: I'm purposefully using less async await here than in customerController.js just to see if the code
// is easier to read, looks cleaner etc.

exports.movie_create = (req, res) => {
    const movie = new Movie(req.query);
    movie.save().then(movie => {
        res.status(200).json(movie);
    }).catch(err => {
        res.status(400).json({
            "Error msg": `Could not create model instance. Bad query: ${JSON.stringify(req.query)}`,
            "err": err
        });
    });
};

exports.movie_list = (req, res) => {
    Movie.find({}).then(movies => {
        res.status(200).send(movies);
    }).catch(err => {
        res.status(406).json({
            "Error msg": "No movies found",
            "err": err
        });
    });
};

exports.movie_detail = (req, res) => {
    const { movieId } = req.params;
    Movie.findById(movieId).then(movie => {
        res.status(200).json(movie);
    }).catch(err => {
        res.status(406).json({
            "Error msg": `No movie found with id: ${movieId}`,
            "err": err
        });
    });
};

exports.movie_delete = (req, res) => {
  const { movieId } = req.params;
  Movie.findByIdAndRemove(movieId).then(() => {
      res.status(200).json({"Success msg" : "Successfully deleted Movie instance"});
  }).catch(err => {
      res.status(406).json({
          "Error msg": `Could not find and delete movie with id: ${movieId}`,
          "err": err
      });
  });
};


