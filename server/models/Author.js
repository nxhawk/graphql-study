const mongoose = require("mongoose");

const { Schema } = mongoose;

const AuthorSchema = new Schema({
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
});

module.exports = mongoose.model("authors", AuthorSchema);
