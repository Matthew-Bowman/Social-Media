# Social-Media
A CRUD Application built with using the MERN Stack.

---
## Stack
##### M - MySQL
##### E - ExpressJS
##### R - ReactJS
##### N - NodeJS
---

# Getting Started
---
## 1. Clone Repository

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
Paste: ```npm start```
This will start the server

## 6. Start Client
Open another terminal (keeping the previous one open) and navigate into the client directory
Paste: ```npm start```
This will start the client and open your default browser pointing to the hosted client
