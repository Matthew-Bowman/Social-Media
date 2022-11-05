// REQUIRE Modules
require(`dotenv`).config();
const express = require(`express`);
const router = express.Router();
const path = require("path");

router.get("/", (req, res) => {
  res.render("documentation");
});

// EXPORT Routes
module.exports = router;
