// REQUIRE Modules
require(`dotenv`).config();
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");

// CLASS: Database Connection
class Connection {
  constructor() {
    // INITIALISE Class Variables
    this.user = process.env.DB_USER;
    this.password = process.env.DB_PASS;
    this.host = process.env.DB_HOST;
    this.database = process.env.DB_DATABASE;
    this.port = process.env.DB_PORT;
    this.connection;

    // CREATE Connection
    this.connection = mysql.createConnection({
      host: this.host,
      user: this.user,
      password: this.password,
      database: this.database,
      port: this.port,
    });

    // PUBLIC METHODS

    // METHOD: Get user from user table matching usernames
    this.GetUserByUsername = (username) => {
      // SETUP database query
      const query = `SELECT * FROM user WHERE username=?`;
      const inserts = [username];
      const sql = mysql.format(query, inserts);

      // RETURN results
      return new Promise((resolve, reject) => {
        // PERFORM Query
        this.connection.query(sql, (err, res) => {
          if (err) reject(err);
          else resolve(res);
        });
      });
    };

    // METHOD: Get user from user table matching id
    this.GetUserByUserID = (id) => {
      // SETUP database query
      const query = `SELECT username,user_id FROM user WHERE user_id=?`;
      const inserts = [id];
      const sql = mysql.format(query, inserts);

      // RETURN results
      return new Promise((resolve, reject) => {
        // PERFORM Query
        this.connection.query(sql, (err, res) => {
          if (err) reject(err);
          else resolve(res);
        });
      });
    };

    // METHOD: Get posts related to a user
    this.GetPostsByUserID = (userID) => {
      // SETUP database query
      const query = `SELECT * FROM post WHERE user_id=? ORDER BY post_id DESC`;
      const inserts = [userID];
      const sql = mysql.format(query, inserts);

      // RETURN results
      return new Promise((resolve, reject) => {
        // PERFORM Query
        this.connection.query(sql, (err, res) => {
          if (err) reject(err);
          else resolve(res);
        });
      });
    };

    // METHOD: Adds a user to the database
    this.CreateUser = (username, password) => {
      // SETUP database query
      const query = "INSERT INTO user (username, password) VALUES (?, ?)";
      const inserts = [
        username,
        bcrypt.hashSync(password, bcrypt.genSaltSync(5)),
      ];
      const sql = mysql.format(query, inserts);

      // RETURN results
      return new Promise((resolve, reject) => {
        // PERFORM Query
        this.connection.query(sql, (err, res) => {
          if (err) reject(err);
          else resolve(res);
        });
      });
    };

    // METHOD: Compares two passwords
    this.AuthorizeUser = (password, hashedPassword) => {
      return bcrypt.compareSync(password, hashedPassword);
    }
  }
}

module.exports = Connection;
