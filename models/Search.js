const mongoose = require("mongoose");

const SearchSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true,
    unique: true,
  },
  Year: {
    type: Number,
    required: true,
  },
  imdb: {
    type: String,
    required: true,
  },
  Type: {
    type: String,
    required: true,
  },
  Language: {
    type: String,
    required: true,
  },
  Genre: {
    type: String,
    required: true,
  },
  Poster: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Search", SearchSchema);
