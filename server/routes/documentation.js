// REQUIRE Modules
require(`dotenv`).config();
const express = require(`express`);
const router = express.Router();
const fs = require("fs");

// GET Docs Data
const data = JSON.parse(fs.readFileSync("./data/documentation.json"));

router.get("/", (req, res) => {
  res.render("documentation", data);
});

// EXPORT Routes
module.exports = router;
