# Social-Media
A CRUD Application built with using the MERN Stack.

---
## Stack
##### M - MySQL
##### E - ExpressJS
##### R - ReactJS
##### N - NodeJS
---

# Notes
---
Documentation can be found at
`localhost:3001/docs` 

Replace localhost:3001 with your setup

# Getting Started
---
## 0. Prerequisites
NodeJS

MySQL

## 1. Clone Repository
Open your Terminal

Navigate to desired directory

Run: `git clone https://github.com/Matthew-Bowman/Social-Media.git`

## 2. Install Dependencies

### Install Client Dependencies
Open your Terminal

Navigate into the `client` directory

Run: `npm install`

### Install Server Dependencies
Open your Terminal

Navigate into the `server` directory

Run: `npm install`

## 3. Create MySQL Database

### Entity Relationship Diagram
![Entity Relationship Diagram](https://i.imgur.com/W8jpMcQ.png "High Level ERD")

## 4. Assign Environment Variables
Create a `.env` file inside of the projects `server` directory.

### Example .env File
```
PORT=3001 # Stores the port the server will run on
DB_USER=username # Stores the MySQL username
DB_PASS=password # Stores the MySQL password
DB_HOST=localhost # Stores the MySQL hostname
DB_DATABASE=database_name # Stores the database name you created
DB_PORT=3306 # Stores the port MySQL is running on
JWT_SECRET=RANDOM_STRING # Stores a secret for jsonwebtoken
```

## 5. Start Server
Open a terminal and navigate into the project's `server` directory.

Run: ```npm start```

This will start the server

## 6. Start Client
Open another terminal (keeping the previous one open) and navigate into the client directory

Run: ```npm start```

This will start the client and open your default browser pointing to the hosted client


# To Do
---

## Client
1. Add Error Handling for Axios requests
    - Unchecked Pages/Components:
        1. Profile (Page)
        2. Login (Page)
        3. Home (Page)
        4. CreatePost.js (Page)
        5. Post (Component)
2. Add Comments
3. Add Settings Page

## Server
1. Finish styling docs