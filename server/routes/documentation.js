// REQUIRE Modules
require(`dotenv`).config();
const express = require(`express`);
const router = express.Router();
const path = require("path");

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../templates/documentation.html"))
});

// EXPORT Routes
module.exports = router;
