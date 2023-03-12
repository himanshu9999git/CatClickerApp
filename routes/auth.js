const express = require("express");
const router = express.Router();
const Cat = require("../models/Cat");

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./assets",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("image");

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images only!");
  }
}

router.post("/cat", async (req, res) => {
  upload(req, res, async (err) => {
    try {
      const { name, age, nicknames } = req.body;
      const image = req.file.path;

      let newCat = await Cat.findOne({ name });
      if (newCat) {
        newCat.set({ age: age, image: image, nicknames: nicknames });

        newCat
          .save()
          .then(() => {
            res.json({ message: "Record updated successfully" });
          })
          .catch((error) => {
            res
              .status(500)
              .json({ message: `Error updating record: ${error.message}` });
          });
      } else {
        newCat = new Cat({
          name,
          age,
          nicknames,
          image,
        });

        newCat
          .save()
          .then(() => {
            res.status(200).json({ message: "Data added to database" });
          })
          .catch((error) => {
            res.status(500).json({ error: error.message });
          });
      }
    } catch (error) {
      res.status(500).send(`Some Error occured ${error}`);
    }
  });
});

router.get("/data", async (req, res) => {
  try {
    const data = await Cat.find({});
    res.json(data);
  } catch (error) {
    res.status(500).send("Some Error occured");
  }
});

module.exports = router;
