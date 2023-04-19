const { User, Thoughts } = require("../models");
const { ObjecId } = require("mongoose").Types;

module.exports = {
  //get all users with their thoughts
  getUsers(req, res) {
    User.find()
      .populate("thoughts")
      .then((users) => {
        res.json(users);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate("thoughts")
      .then(async (users) => {
        !users
          ? res.status(404).json({ message: "User not found with that ID" })
          : res.json({
              message: "User found",
            });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json;
      });
  },
};