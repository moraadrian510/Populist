const express = require("express");
const { MongoClient } = require("mongodb");

const PORT = process.env.PORT || 3000;
const connectionStringURI = "mongodb://127.0.0.1:27017";
const dbName = "populistDB";

const app = express();

app.use(express.json());


//routes to check if db is working properly---------
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Connect to MongoDB and start server
MongoClient.connect(connectionStringURI, { useUnifiedTopology: true })
  .then((client) => {
    console.log("Connected successfully to MongoDB");
    const db = client.db(dbName);
    app.locals.db = db;
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1);
  });

