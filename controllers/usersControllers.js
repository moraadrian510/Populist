const { User, Thoughts } = require("../models");
const { findOneAndUpdate } = require("../models/Thoughts");
const { ObjectId } = require("mongoose").Types;

module.exports = {
  //get all users with their thoughts
getUsers(req, res) {
    console.log("getUsers")
    User.find()
    .populate("thoughts")// a---------------Question
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
  //update a user
  updateUser(req, res) {
    User.updateOne(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err))
  },
  // Delete user
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
  },
  // Add friend to user 
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends:  req.params.friendId } },
      { runValidators: true, new: true }
    )
    .then((User) =>
      !User
      ? res
        .status(404)
        .json({ message: "No user with that ID found In DB"})
        : res.json(User)
    )
    .catch((err) => res.status(500).json(err));
  },
  // Remove friend from User 
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull:  { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
    .then((user) =>{
    
      return !user
      ? res 
        .status(404)
        .json( { message: "No friends with that ID found in profile"})
      : res.json(user)
    })
    .catch((err) => res.status(500).json(err))
  }
};
