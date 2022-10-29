// REQUIRE Modules
const express = require(`express`);
const router = express.Router();
const Connection = require(`../utils/database`);

// INSTANTIATE DB Connection
const database = new Connection();

// REGISTER Route
router.get(`/posts`, (req, res, next) => {
  // CHECK for username in querystring
  if (!req.query.username) res.json({ code: 404, message: "No Username" });
  else {
    // INITIALISE username variable
    let username = req.query.username;

    // CHECK if username exists
    database
      .GetUserByUsername(username)
      .then((result) => {
        // CHECK if user exists
        if (result.length <= 0)
          res.json({ code: 404, message: "User Not Found" });
        else {
          // INIT user var
          const user = result[0];

          // GET user Posts and respond to request
          database
            .GetPostsByUserID(user.user_id)
            .then((postsResult) =>
              res.json({
                code: 200,
                message: "OK",
                body: { posts: postsResult, username: result[0].username },
              })
            )
            .catch((err) =>
              res.json({ code: 500, message: "Internal Server Error" })
            );
        }
      })
      .catch((err) =>
        res.json({ code: 500, message: "Internal Server Error" })
      );
  }
});

router.post(`/users/create`, (req, res) => {
  if (!req.body.username || !req.body.password)
    res.json({ code: 404, message: "Username/Password not Provided" });
  else {
    const username = req.body.username;
    const password = req.body.password;

    database
      .GetUserByUsername(username)
      .then((result) => {
        if (result.length > 0) res.json({ code: 409, message: "Conflict" });
        else {
          if (username.length > 50)
            res.json({ code: 413, message: "Payload Too Large" });
          else {
            database
              .CreateUser(username, password)
              .then((result) => {
                res.json({ code: 201, message: "Created" });
              })
              .catch((err) =>
                res.json({ code: 500, message: "Internal Server Error" })
              );
          }
        }
      })
      .catch((err) =>
        res.json({ code: 500, message: "Internal Server Error" })
      );
  }
});

// EXPORT Routes
module.exports = router;
