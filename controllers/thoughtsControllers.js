const { Thought, User} = require("../models");

module.exports = {

  getThoughts(req, res) {
    Thought.find(req.body)
    .then((thoughts) => res.json(thoughts))
    .catch((err) => res.status(500).json(err));
  },
  // get a single thought
  getSingleThought(req, res) {
    Thought.findById({ _id: req.params.thoughtId })
      //   .populate("reaction")
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
          { _id: req.params.userId },
          { $addToSet: { thoughts: thoughts._id } },
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
    Thought.updateOne(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) => res.json(thought))
      .catch((err) => res.status(err));
  },
  // remove thought
  removeThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "No thought with this ID was found" })
          : User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } },
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
  // create reaction
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { new: true }
    )
      .then((reactions) => {
        !reactions
          ? reactions.status(404).json({
              message: "Reaction created , but thougt Id not found",
            })
          : res.json("Reaction created 🎉");
      })
      .catch((eer) => {
        res.status(500).json(err);
      });
  },
  // delete reaction
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: req.params.reactionsId } },
      { new: true }
    )
      .then((reactions) =>
        !reactions
          ? res.status(404).json({
              message: "Reaction not found",
            })
          : res.json({ message: "Reaction  was successfully removed!" })
      )
      .catch((err) => res.status(500).json(err));
  },
};
