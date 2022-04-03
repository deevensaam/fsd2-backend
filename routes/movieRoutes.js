const { Router } = require("express");
const Movie = require("../models/Movie");

const router = Router();

// get collection
router.get("/", async (req, res) => {
    try {
      const movies = await Movie.find();
      res.json(movies);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // create individual
router.post("/", async (req, res) => {
    const movie = newMovie({
      title: req.body.title,
      genre: req.body.genre,
      imdb: req.body.imdb,
      image: req.body.image,
      duration: req.body.duration,
      trailer: req.body.trailer,
    });
    try {
      const newMovie = await movie.save();
      res.status(201).json(newMovie);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  // get individual
router.get("/:id", getMovieById, (req, res) => {
    res.status(200).json(res.movie);
  });

  // update individual
router.patch("/:id", getMovieById, async (req, res) => {
    if (req.body.title != null) {
      res.search.title = req.body.title;
    }
    if (req.body.genre != null) {
      res.search.genre = req.body.genre;
    }
    if (req.body.imdb != null) {
      res.search.imdb = req.body.imdb;
    }
    if (req.body.image != null) {
      res.search.image = req.body.image;    
    }
    if (req.body.duration != null) {
      res.search.duration = req.body.duration;    
    }
    if (req.body.trailer != null) {
      res.search.trailer = req.body.trailer;    
    }
    try {
      const updatedMovie = await res.search.save();
      res.status(200).json(updatedMovie);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // delete individual
router.delete("/:id", getMovieById, async (req, res) => {
    try {
      await res.search.remove();
      res.status(200).json({ message: "deleted succesfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    } 
  });

  async function getMovieById(req, res, nxt) {
    let movie;
    try {
      movie = await Movie.findById(req.params.id);
      if (movie == null) {
        return res.status(400).json({ message: "movie does not exist" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
    res.search = search;
    nxt();
  }
  
  module.exports = router;