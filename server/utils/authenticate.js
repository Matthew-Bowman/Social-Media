// REQUIRE Modules
require(`dotenv`).config();
const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  // CHECK for cookies
  if (!req.headers.cookie) {
    res.status(404);
    res.json({ code: 404, message: "Missing Cookies" });
  } else {
    // CHECK for auth_token cookie
    const cookies = req.headers.cookie.split("; ").map((val) => val.split("="));
    const cookiesObj = Object.assign(...cookies.map(([k, v]) => ({ [k]: v })));

    if (!cookiesObj.auth_token) {
      res.status(404);
      res.json({ code: 404, message: "Missing auth_token Cookie" });
    } else {
      // VERIFY jsonwebtoken
      jwt.verify(
        cookiesObj.auth_token,
        process.env.JWT_SECRET,
        (err, decoded) => {
          if (err) {
            res.status(401);
            res.json({ code: 401, message: "Unauthorized" });
          } else {
            if (!decoded) {
              res.status(401);
              res.json({ code: 401, message: "Unauthorized" });
            } else next();
          }
        }
      );
    }
  }
};

module.exports = authenticate;
