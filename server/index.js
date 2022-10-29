// REQUIRE Modules
require(`dotenv`).config();
const express = require(`express`);
const app = express();
const cors = require("cors");

// INITIALISE Variables

// SETUP App
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// START Server
app.listen(3001, () => console.log(`Server Started on Port: 3001`));
