const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  genre: {
    type: String,
    required: true,
  },
  imdb: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  trailer: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Movie", movieSchema);
