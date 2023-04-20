const express = require("express")
const db = require("./config/connection")
//const { MongoClient } = require("mongodb");
const PORT = process.env.PORT || 3001;
//const connectionStringURI = "mongodb://127.0.0.1:27017";
//const dbName = "populistDB";
const routes = require('./routes')
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);


db.once("open", (err, db) => {
  app.listen(PORT, () => {
    console.log("Listening in port :", PORT)
  })
})

