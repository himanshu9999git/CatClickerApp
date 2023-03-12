const connectToMongo = require("./db");
const express = require("express");
// const cors = require("cors");

require("dotenv").config();

connectToMongo();
const app = express();
const port = 3001;

// app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/auth", require("./routes/auth"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
