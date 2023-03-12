const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const connectToMongo = () => {
  mongoose.connect(process.env.MONGO_URI, () => {
    console.log("Connected To Mongo Successfully");
  });
};

module.exports = connectToMongo;
