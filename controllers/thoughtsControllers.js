const { Thoughts, User } = require("../models");


module.exports = {
  //get all thoughts
  getThoughts(req, res) {
    Thoughts.find({ userName: req.params.userId })
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
},
  // get a single thought
  getSingleThought(req, res) {
    Thoughts.findOne({ _id: req.params.thoughtsId })
    //   .populate("reaction")
      .then((thoughts) => {
        console.log(thoughts);
        res.json(thoughts);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //create a new thought
  createThought(req, res) {
    Thoughts.create(req.body)
      .then((thoughts) => {
        return User.findOneAndUpdate(
          { _id: req.params.UserId },
          { $addToSet: { thoughts: req.params.thoughtsId } },
          { new: true }
        );
      })
      .then((thoughts) => {
        !thoughts
          ? res.status(404).json({
              message: "Thought created , but no user with that id found",
            })
          : res.json("Created the thought 🎉");
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  //update user thought
  updateThought(req, res) {
    Thoughts.updateOne(
      { _id: req.params.thoughtsId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(err));
  },
  // remove thought
  removeThought(req, res) {
    Thoughts.findOneAndRemove({ _id: req.params.thoughtsId })
      .then((thoughts) =>
        !thoughts
          ? res
              .status(404)
              .json({ message: "No thought with this ID was found" })
          : User.findOneAndUpdate(
              { thoughts: req.params.thoughtsId },
              { $pull: { thoughts: req.params.thoughtsId } },
              { new: true }
            )
      )
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({
              message: "Thouht not found",
            })
          : res.json({ message: "Thought was successfully removed!" })
      )
      .catch((err) => res.status(500).json(err));
  },
};
