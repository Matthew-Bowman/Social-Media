// REQUIRE Modules
require(`dotenv`).config();
const express = require(`express`);
const app = express();
const cors = require("cors");
const Connection = require(`./dbOperations`)

// INITIALISE Variables
const PORT = process.env.PORT

// INSTANTIATE DB Connection
const connection = new Connection();

// SETUP Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// SETUP Routes
app.get(`/`, (req, res) => {
    res.json({code: 200, message: "OK"});
});

app.get(`/profile`, (req, res) => {
    res.json({code: 200, message: "OK"});
});

app.get(`/settings`, (req, res) => {
    res.json({code: 200, message: "OK"});
});


app.get(`/login`, (req, res) => {
    res.json({code: 200, message: "OK"});
});


app.get(`/signup`, (req, res) => {
    res.json({code: 200, message: "OK"});
});


// START Server
app.listen(PORT, () => console.log(`Server Started on Port: ${PORT}`));
