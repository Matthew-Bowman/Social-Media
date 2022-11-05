// REQUIRE Modules
require(`dotenv`).config();
const express = require(`express`);
const router = express.Router();

const htmlFile = require("../templates/documentation.html");

router.get("/", (req, res) => {
    
});

// EXPORT Routes
module.exports = router;
