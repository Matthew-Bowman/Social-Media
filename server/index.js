// REQUIRE Modules
require(`dotenv`).config();
const express = require(`express`);
const app = express();
const cors = require("cors");

// INITIALISE Variables
const PORT = process.env.PORT

// SETUP App
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// START Server
app.listen(PORT, () => console.log(`Server Started on Port: ${PORT}`));
