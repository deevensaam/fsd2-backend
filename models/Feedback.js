const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  telnum: {
    type: Number,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  message: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Feedback", FeedbackSchema);
