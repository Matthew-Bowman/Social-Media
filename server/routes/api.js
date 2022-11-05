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
router.get(`/posts`, authenticate, (req, res, next) => {
  // Get Requesting User
  const token = req.cookies.auth_token;
  const tokenUser = jwt.verify(token, process.env.JWT_SECRET);

  // CHECK for username in querystring
  if (!req.query.username) {
    res.status(422);
    res.json({ code: 422, message: "Unprocessable Entity" });
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
            .GetPostsByUserID(user.user_id, tokenUser.id)
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
    res.status(422);
    res.json({ code: 422, message: "Unprocessable Entity" });
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

router.get("/me", authenticate, (req, res) => {
  const token = req.cookies.auth_token;
  const user = jwt.verify(token, process.env.JWT_SECRET);

  database
    .GetUserByUserID(user.id)
    .then((result) => {
      res.status(200);
      res.json({ code: 200, message: "OK", body: { user: result[0] } });
    })
    .catch((err) => {
      res.status(500);
      res.json({ code: 500, message: "Internal Server Error" });
    });
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

router.post("/me/posts", authenticate, (req, res) => {
  const token = req.cookies.auth_token;
  const user = jwt.verify(token, process.env.JWT_SECRET);
  const content = req.body.content;

  database
    .CreatePost(user.id, content)
    .then((result) => {
      res.status(201);
      res.json({ code: 201, message: "Created" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
      res.json({ code: 500, message: "Internal Server Error" });
    });
});

router.delete("/me/posts", authenticate, (req, res) => {
  const token = req.cookies.auth_token;
  const user = jwt.verify(token, process.env.JWT_SECRET);
  const post_id = req.body.post_id;

  database
    .GetUserIDbyPostID(post_id)
    .then((result) => {
      if (result.length <= 0) {
        res.status(404);
        res.json({ code: 404, message: "Not Found" });
      } else {
        const user_id = result[0].user_id;
        if (user_id !== user.id) {
          res.status(403);
          res.json({ code: 403, message: "Forbidden" });
        } else {
          // REMOVE Likes from Post
          database
            .RemoveLikesByPostID(post_id)
            .then(() => {
              // REMOVE Post
              database
                .DeletePostByPostID(post_id)
                .then(() => {
                  res.status(200);
                  res.json({ code: 200, message: "Success" });
                })
                .catch(() => {
                  res.status(500);
                  res.json({ code: 500, message: "Internal Server Error" });
                });
            })
            .catch(() => {
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
});

router.put(`/me/posts`, authenticate, (req, res) => {
  const token = req.cookies.auth_token;
  const user = jwt.verify(token, process.env.JWT_SECRET);
  const post_id = req.body.post_id;
  const content = req.body.content;

  database
    .GetUserIDbyPostID(post_id)
    .then((result) => {
      if (result.length <= 0) {
        res.status(404);
        res.json({ code: 404, message: "Not Found" });
      } else {
        const user_id = result[0].user_id;
        if (user_id !== user.id) {
          res.status(403);
          res.json({ code: 403, message: "Forbidden" });
        } else {
          database
            .UpdatePostByPostID(post_id, content)
            .then((result) => {
              res.status(200);
              res.json({ code: 200, message: "Success" });
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
});

// ADD VALIDATOIN
router.post(`/me/like`, authenticate, (req, res) => {
  // GET User
  const token = req.cookies.auth_token;
  const user = jwt.verify(token, process.env.JWT_SECRET);

  // PRESENCE CHECK for post_id param
  if (!req.body.post_id) {
    res.status(422);
    res.json({ code: 422, message: "Unprocessable Entity" });
  } else {
    const post_id = req.body.post_id;

    // PRESENCE CHECK for Post
    database
      .GetPostByPostID(post_id)
      .then((post) => {
        if (post.length <= 0) {
          res.status(404);
          res.json({ code: 404, message: "Not Found" });
        } else {
          // CHECK if post liked
          database.IsPostLiked(post_id, user.id).then((isLiked) => {
            if (isLiked) {
              res.status(400);
              res.json({ code: 400, message: "Bad Request" });
            } else {
              // LIKE Post
              database
                .LikePost(post_id, user.id)
                .then((result) => {
                  res.status(201);
                  res.json({ code: 201, message: "Created" });
                })
                .catch((err) => {
                  res.status(500);
                  res.json({ code: 500, message: "Internal Server Error" });
                });
            }
          });
        }
      })
      .catch(() => {
        res.status(500);
        res.json({ code: 500, message: "Internal Server Error" });
      });
  }
});

// ADD VALIDATION
router.delete(`/me/like`, authenticate, (req, res) => {
  // GET User
  const token = req.cookies.auth_token;
  const user = jwt.verify(token, process.env.JWT_SECRET);

  // PRESENCE CHECK for post_id param
  if (!req.body.post_id) {
    res.status(422);
    res.json({ code: 422, message: "Unprocessable Entity" });
  } else {
    const post_id = req.body.post_id;

    // PRESENCE CHECK for Post
    database
      .GetPostByPostID(post_id)
      .then((post) => {
        if (post.length <= 0) {
          res.status(404);
          res.json({ code: 404, message: "Not Found" });
        } else {
          // CHECK if post liked
          database.IsPostLiked(post_id, user.id).then((isLiked) => {
            if (!isLiked) {
              res.status(400);
              res.json({ code: 400, message: "Bad Request" });
            } else {
              // UNLIKE Post
              database
                .UnlikePost(post_id, user.id)
                .then((result) => {
                  res.status(200);
                  res.json({ code: 200, message: "Success" });
                })
                .catch((err) => {
                  res.status(500);
                  res.json({ code: 500, message: "Internal Server Error" });
                });
            }
          });
        }
      })
      .catch(() => {
        res.status(500);
        res.json({ code: 500, message: "Internal Server Error" });
      });
  }
});

// EXPORT Routes
module.exports = router;
