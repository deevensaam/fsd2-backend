const { Router } = require("express");
const Search = require("../models/Search");

const router = Router();

// get collection
router.get("/", async (req, res) => {
  try {
    const searches = await Search.find();
    res.json(searches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// create individual
router.post("/", async (req, res) => {
  const search = new Search({
    Title: req.body.Title,
    Year: req.body.Year,
    imdbID: req.body.imdbID,
    Type: req.body.Type,
    Language: req.body.Language,
    Genre: req.body.Genre,
    Poster: req.body.Poster,
    movieReviews: req.body.movieReviews
  });
  try {
    const newSearch = await search.save();
    res.status(201).json(newSearch);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// get individual
router.get("/:id", getSearchById, (req, res) => {
  res.status(200).json(res.search);
});

// update individual
router.patch("/:id", getSearchById, async (req, res) => {
  if (req.body.Title != null) {
    res.search.Title = req.body.Title;
  }
  if (req.body.Year != null) {
    res.search.Year = req.body.Year;
  }
  if (req.body.imdbID != null) {
    res.search.imdbID = req.body.imdbID;
  }
  if (req.body.Type != null) {
    res.search.Type = req.body.Type;    
  }
  if (req.body.Language != null) {
    res.search.Language = req.body.Language;    
  }
  if (req.body.Genre != null) {
    res.search.Genre = req.body.Genre;    
  }
  if (req.body.Poster != null) {
    res.search.Poster = req.body.Poster;    
  }
  if (req.body.movieReviews != null) {
    res.search.movieReviews = req.body.movieReviews;    
  }

  try {
    const updatedSearch = await res.search.save();
    res.status(200).json(updatedSearch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete individual
router.delete("/:id", getSearchById, async (req, res) => {
  try {
    await res.search.remove();
    res.status(200).json({ message: "deleted succesfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } 
});

async function getSearchById(req, res, nxt) {
  let search;
  try {
    search = await Search.findById(req.params.id);
    if (search == null) {
      return res.status(400).json({ message: "search does not exist" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.search = search;
  nxt();
}

module.exports = router;
