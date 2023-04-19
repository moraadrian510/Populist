const express = require("express")
const db = require("./config/connection")
//const { MongoClient } = require("mongodb");
const PORT = process.env.PORT || 3001;
//const connectionStringURI = "mongodb://127.0.0.1:27017";
//const dbName = "populistDB";
const routes = require('./routes')
const app = express();

// //routes to check if db is working properly---------
// app.get("/", (req, res) => {
//   res.send("Hello, world!");
// });
// // Test if db is working------
// app.put("/", (req, res) => {
//   res.send("put route")
// })

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);


// // Connect to MongoDB and start server
// MongoClient.connect(connectionStringURI, { useUnifiedTopology: true })
//   .then((client) => {
//     console.log("Connected successfully to MongoDB");
//     const db = client.db(dbName);
//     console.log(db)
//     app.locals.db = db;
//     app.listen(PORT, () => {
//       console.log(`Server listening on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("Error connecting to MongoDB:", err.message);
//     process.exit(1);
//   });


db.once("open", (err, db) => {
  app.listen(PORT, () => {
    console.log("Listening in port :", PORT)
  })
})

