const mongoose = require("mongoose");
const { Schema } = mongoose;

const CatSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  nicknames: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
});

const Cat = mongoose.model("cat", CatSchema);
Cat.createIndexes();

module.exports = Cat;
