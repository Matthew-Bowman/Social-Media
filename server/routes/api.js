// REQUIRE Modules
require(`dotenv`).config();
const express = require(`express`);
const router = express.Router();
const Connection = require(`../utils/database`);
const jwt = require("jsonwebtoken");
const authenticate = require("../utils/authenticate");

// INSTANTIATE DB Connection
const database = new Connection();

// REGISTER Route
router.get(`/posts`, (req, res, next) => {
  // CHECK for username in querystring
  if (!req.query.username) {
    res.status(404);
    res.json({ code: 404, message: "No Username Provided" });
  } else {
    // INITIALISE username variable
    let username = req.query.username;

    // CHECK if username exists
    database
      .GetUserByUsername(username)
      .then((result) => {
        // CHECK if user exists
        if (result.length <= 0) {
          res.status(404);
          res.json({ code: 404, message: "User Not Found" });
        } else {
          // INIT user var
          const user = result[0];

          // GET user Posts and respond to request
          database
            .GetPostsByUserID(user.user_id)
            .then((postsResult) => {
              res.status(200);
              res.json({
                code: 200,
                message: "OK",
                body: { posts: postsResult, username: result[0].username },
              });
            })
            .catch((err) => {
              res.status(500);
              res.json({ code: 500, message: "Internal Server Error" });
            });
        }
      })
      .catch((err) => {
        res.status(500);
        res.json({ code: 500, message: "Internal Server Error" });
      });
  }
});

router.post(`/users/create`, (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(404);
    res.json({ code: 404, message: "Username/Password not Provided" });
  } else {
    const username = req.body.username;
    const password = req.body.password;

    database
      .GetUserByUsername(username)
      .then((result) => {
        if (result.length > 0) {
          res.status(409);
          res.json({ code: 409, message: "Conflict" });
        } else {
          if (username.length > 50) {
            res.status(413);
            res.json({ code: 413, message: "Payload Too Large" });
          } else {
            database
              .CreateUser(username, password)
              .then((result) => {
                res.status(201);
                res.json({ code: 201, message: "Created" });
              })
              .catch((err) => {
                res.status(500);
                res.json({ code: 500, message: "Internal Server Error" });
              });
          }
        }
      })
      .catch((err) => {
        res.status(500);
        res.json({ code: 500, message: "Internal Server Error" });
      });
  }
});

router.post("/users/authorize", (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(404);
    res.json({ code: 404, message: "Username/Password not Provided" });
  } else {
    const username = req.body.username;
    const password = req.body.password;

    database
      .GetUserByUsername(username)
      .then((result) => {
        if (result.length <= 0) {
          res.status(401);
          res.json({ code: 401, message: "Unauthorized" });
        } else {
          const authorized = database.AuthorizeUser(
            password,
            result[0].password
          );
          if (!authorized) {
            res.status(401);
            res.json({ code: 401, message: "Unauthorized" });
          } else {
            // GENERATE jsonwebtoken
            const token = jwt.sign(
              { id: result[0].user_id },
              process.env.JWT_SECRET,
              {}
            );

            if (req.cookies[`auth_token`]) req.cookies[`auth_token`] = ``;

            // APPLY token to httponly cookie
            res.cookie(`auth_token`, token, {
              path: "/",
              httpOnly: true,
              sameSite: "lax",
            });

            // RESPOND to request
            res.status(200);
            res.json({ code: 200, message: "OK", body: { token: token } });
          }
        }
      })
      .catch((err) => {
        res.status(500);
        res.json({ code: 500, message: "Internal Server Error" });
      });
  }
});

router.post("/me/logout", authenticate, (req, res) => {
  res.clearCookie("auth_token");

  res.status(200);
  res.json({ code: 200, message: "OK" });
});

router.get("/me/posts", authenticate, (req, res) => {
  const token = req.cookies.auth_token;
  const user = jwt.verify(token, process.env.JWT_SECRET);

  database
    .GetPostsByUserID(user.id)
    .then((result) => {
      res.status(200);
      res.json({ code: 200, message: "OK", body: { posts: result } });
    })
    .catch((err) => {
      res.status(500);
      res.json({ code: 500, message: "Internal Server Error" });
    });
});

// EXPORT Routes
module.exports = router;
