const { MongoClient } = require("mongodb");
const express = require("express");
const dbConnection = require("./config/connection");
const routes = require("./routes");

const PORT = 3001;
const app = express();

// Connection string to local instance of MongoDB
const connectionStringURI = "mongodb://127.0.0.1:27017";

// Initialize a new instance of MongoClient
const client = new MongoClient(connectionStringURI);

//Variable that hold database name
const dbName = "populistDB";

// Use connect method to connect to the mongo server
client
  .connect()
  .then(() => {
    console.log("Connected successfully to MongoDB");
    // Use client.db() constructor to add new db instance
    const db = client.db(dbName);

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(routes);

    // start up express server
    app.listen(PORT, () => {
      console.log(`Example app listening at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Mongo connection error: ", err.message);
  });

