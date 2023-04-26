const { Thought, User} = require("../models");

module.exports = {

  getThoughts(req, res) {
    Thought.find(req.body)
    .populate({
      path: "reactions",
      select: "-__v",
    })
    .then((thoughts) => res.json(thoughts))
    .catch((err) => res.status(500).json(err));
  },
  // get a single thought
  getSingleThought(req, res) {
    Thought.findById({ _id: req.params.thoughtsId })
        .populate("reactions")
      .then((thought) => {
        console.log(thought, "thought");
        console.log(thought);
        res.json(thought);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //create a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        console.log(thought, "thought");
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((thought) => {
        !thought
          ? res.status(404).json({
              message: "Thought created , but no user with that id found",
            })
          : res.json("Created new thought  🎉");
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  //update user thought
  updateThought(req, res) {
    console.log('thought')
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
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "No thought with this ID was found" })
          : User.findOneAndUpdate(
              { thoughts: req.params.thoughtsId },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            )
      )
      .then((thought) =>
        !thought
          ? res.status(404).json({
              message: "Thought not found",
            })
          : res.json({ message: "Thought was successfully removed!" })
      )
      .catch((err) => res.status(500).json(err));
  },
  // create reaction
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtsId },
      { $addToSet: { reactions: req.body } },
      { new: true }
    )
      .then((reactions) => {
        !reactions
          ? reactions.status(404).json({
              message: "Reaction created , but thought Id not found",
            })
          : res.json("Reaction created 🎉");
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  // delete reaction 1
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtsId },
      { $pull: { reactions: req.params.reactionId } },
      { runValidators: true, new: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: "No thought with this id!" });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};
