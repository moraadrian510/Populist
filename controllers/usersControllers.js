const { User, Thoughts } = require('../models');
const { ObjecId } = require('mongoose').Types;

module.exports = {
    //get all users with their thoughts
    getUsers(req, res) {
    User.find()
        .populate('thoughts')
        .then(users => {
        res.json(users);
        })
        .catch(err => {
        console.log(err);
        res.status(500).json(err);
        });
    }
}