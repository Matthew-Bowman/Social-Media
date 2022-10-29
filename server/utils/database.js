// REQUIRE Modules
const mysql = require("mysql2");

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
    this.GetUserByUsername = (username) => {
      // SETUP database query
      const query = `SELECT username FROM user WHERE username=?`;
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
  }
}

module.exports = Connection;
