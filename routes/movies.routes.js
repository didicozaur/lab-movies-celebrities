const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

router.get("/movie/create", (req, res, next) => {
  Celebrity.find()
    .then((celebritiesArr) => {
      res.render("movies/new-movie.hbs", { celebrity: celebritiesArr });
    })
    .catch((err) => {
      console.log(`Error finding celebrities:`, err);
    });
});

router.post("/movie/create", (req, res, next) => {
  const newMovie = {
    title: req.body.title,
    genre: req.body.genre,
    plot: req.body.plot,
    cast: req.body.cast,
  };

  Movie.create(newMovie)
    .then(() => {
      console.log("movie created successfully");
      res.redirect("/movies");
    })
    .catch((err) => {
      console.log("Error creating movie");
      res.render("movies/new-movie.hbs");
    });
});

router.get("/movies", (req, res, next) => {
  Movie.find()
    .then((moviesArr) => {
      res.render("movies/movies.hbs", { movie: moviesArr });
    })
    .catch((err) => {
      console.log(`Error finding movies:`, err);
    });
});

router.get("/movies/:movieId", (req, res, next) => {
  const movieId = req.params.movieId;

  Movie.findById(movieId)
    .populate("cast")
    .then((foundMovie) => {
      console.log(foundMovie);
      res.render("movies/movie-details.hbs", { movie: foundMovie });
    })
    .catch((err) => {
      console.log(`Error finding movies:`, err);
    });
});

router.post("/movies/:movieId", (req, res, next) => {
  const newMovie = {
    title: req.body.title,
    genre: req.body.genre,
    plot: req.body.plot,
    cast: req.body.cast,
  };
  const movieId = req.params.movieId;

  Movie.findByIdAndUpdate(movieId, newMovie)
    .then(() => {
      console.log("Movie updated successfully");
      res.redirect("/movies/" + movieId);
    })
    .catch((err) => {
      console.log("Error updating movie");
    });
});

router.get("/movies/:movieId/edit", (req, res, next) => {
  const movieId = req.params.movieId;
  let movie;

  Movie.findById(movieId)
    .populate("cast")
    .then((foundMovie) => {
      movie = foundMovie;
    })
    .then((getCelebs) => {
      Celebrity.find()
        .then((foundCelebrities) => {
          console.log(foundCelebrities, movie);
          res.render("movies/edit-movie.hbs", {
            celebrity: foundCelebrities,
            movie,
          });
        })
        .catch((err) => {
          console.log(`Error finding celebrities:`, err);
        });
    })
    .catch((err) => {
      console.log(`Error finding movies:`, err);
    });
});

router.post("/movies/:movieId/delete", (req, res, next) => {
  const movieId = req.params.movieId;

  Movie.findByIdAndRemove(movieId)
    .then(() => {
      console.log("Movie removed successfully");
      res.redirect("/movies");
    })
    .catch((err) => {
      console.log("Error removing movie");
    });
});

module.exports = router;
