const { Thought } = require('../models');


module.exports = {
    //get all thoughts
    getThoughts(req,res) {
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err))
    },
// get a single thought
    getSingleThought(req, res) {
        Thought.findById(req.params.id)
        .populate('reaction')
        .select('reaction')
        .then((thought) => {
            console.log(thought);
            res.json(thought);
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err);
        })  
    },
    //create a new thought
    createThought(req, res) {
        User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { thoughts: req.body } },
        { runValidators: true, new: true },
        )
        .then((user) => {
        !user
            ? res 
                .status(404)
                .json({ message: 'No user with that id found'})
                : res.json(user)
        })
        .catch((err) => res.status(500).json(err))
    },
    //update user thought
    updateThought(req, res) {
        Thought.updateOne(
            {  _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true },
        )
            .then((thought) => res.json(thought))
            .catch((err) => res.status(err));
    },
    // remove thought from user
    removeThought(req, res) {
        Thought.
    },

}