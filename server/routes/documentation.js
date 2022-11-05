// REQUIRE Modules
require(`dotenv`).config();
const express = require(`express`);
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ code: 200, message: "Success" });
});

// EXPORT Routes
module.exports = router;
