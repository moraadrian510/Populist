const { User, Thoughts } = require("../models");
const { ObjectId } = require("mongoose").Types;

module.exports = {
  //get all users with their thoughts
getUsers(req, res) {
    console.log("getUsers")
    User.find()
    .populate("thoughts")
    .then((users) => {
        console.log("users")
        res.json(users);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
  },
  // get a single user
  getSingleUser(req, res) {
    console.log(req.params.userId)
    User.findOne({ _id: req.params.userId })
    .populate("thoughts")
    .then((users) => {
        console.log(users)
        !users
        ? res.status(404).json({ message: "User not found with that ID" })
        : res.json(users);
    })
    .catch((err) => {
        console.log(err);
        return res.status(500).json;
    });
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
  },
};
