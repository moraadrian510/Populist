const { response } = require("express");
const { Reaction, Thoughts } = require("../models");

module.exports = {
  //Create reaction
    createReaction(req, res) {
    Reaction.create(req.body)
        .then((reactions) => {
        return Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtsId },
            { $addToSet: { reactions: reactions._id } },
            { new: true }
        );
        })
        .then((reactions) => {
        !reactions
            ? reactions.status(404).json({
                message: "Reaction created , but thougt Id not fouond",
            })
            : res.json("Reaction created 🎉");
        })
        .catch((eer) => {
        res.status(500).json(err);
        });
    },
  // delete reaction
    deleteReaction(req, res) {
    Reaction.findOneAndRemove({ _id: req.params.reactionsId })
        .then((reactions) =>
        !reactions
            ? response
            .status(404)
            .json({ message: "No reaction with that ID found" })
        : Thoughts.findOneAndUpdate(
            { reactions: req.params.reactionsId },
            { $pull: { reactions: req.params.reactiosId } },
            { new: true }
            )
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
