// REQUIRE Modules
require(`dotenv`).config();
const express = require(`express`);
const app = express();
const cors = require("cors");
const cookies = require("cookie-parser");

// GET routes
const api = require(`./routes/api`);

// INITIALISE Variables
const PORT = process.env.PORT;

// SETUP Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookies());

// SETUP Routes
app.use(`/api`, api);

// START Server
app.listen(PORT, () => console.log(`Server Started on Port: ${PORT}`));
