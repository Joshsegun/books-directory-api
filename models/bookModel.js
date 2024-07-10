const mongoose = require("mongoose");
const Joi = require("joi");

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, "Title must not be less than 3"],
    maxLength: [50, "Title must not greater than 50"],
    required: [true, "A book must have a title"],
  },
  author: {
    type: String,
    minLength: [5, "Author must not be less than 5"],
    maxLength: [50, "Author must not greater than 50"],
    required: [true, "A book must have an author"],
  },
  genre: {
    type: String,
    minLength: [3, "Genre must not be less than 3"],
    maxLength: [50, "Genre must not greater than 50"],
    required: [true, "A book must have a genre"],
  },
  pages: {
    type: Number,
    required: [true, "A book must have pages"],
  },
  country: {
    type: String,
    default: "United Kingdom",
  },
  price: {
    type: Number,
    default: 50,
    required: true,
  },
  link: {
    type: String,
  },
  imageLink: {
    type: String,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Books = mongoose.model("Books", bookSchema);

module.exports = Books;
