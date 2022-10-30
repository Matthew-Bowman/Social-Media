// REQUIRE Modules
require(`dotenv`).config();
const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  // CHECK for cookies
  if (!req.cookies) {
    res.status(404);
    res.json({ code: 404, message: "Missing Cookies" });
  } else {
    // CHECK for auth_token cookie
    if (!req.cookies["auth_token"]) {
      res.status(404);
      res.json({ code: 404, message: "Missing Token Cookie" });
    } else {
      // VERIFY jsonwebtoken
      const token = req.cookies["auth_token"]
      console.log(token);
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          res.status(401);
          res.json({ code: 401, message: "Unauthorized" });
        } else {
          if (!decoded) {
            res.status(401);
            res.json({ code: 401, message: "Unauthorized" });
          } else next();
        }
      });
    }
  }
};

module.exports = authenticate;
