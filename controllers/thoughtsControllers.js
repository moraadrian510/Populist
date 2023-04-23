const { Thought, User } = require("../models");


module.exports = {
  //get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // get a single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtsId })
      .populate("reaction")
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
    Thought.create(req.body)
      .then((thoughts) => {
        return User.findOneAndUpdate(
          { _id: req.body.UserId },
          { $addToSet: { thoughts: thoughts._id } },
          { new: true }
        );
      })
      .then((thought) => {
        !thought
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
    Thought.updateOne(
      { _id: req.params.thoughtsId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) => res.json(thought))
      .catch((err) => res.status(err));
  },
  // remove thought
  removeThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtsId })
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
      .then((thought) =>
        !thought
          ? res.status(404).json({
              message: "Thouht not found",
            })
          : res.json({ message: "Thought was successfully removed!" })
      )
      .catch((err) => res.status(500).json(err));
  },
};
