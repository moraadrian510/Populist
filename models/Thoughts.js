const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const moment = require('moment');

//import reaction schema
const thoughtsSchema = new Schema(
{
    thoughtText: {
        type:  String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: function (createdAt) {
             // Format the timestamp using Moment.js
        return moment(createdAt).format('MMMM Do YYYY, h:mm:ss a'); // check if woorks!!!
        }
    },
    userName: {
    type: String,
    ref: 'User',
    required: true,
    },
    reactions: [reactionSchema],

}, 
{ timestamps: true ,
    toJSON: {
        virtuals: true,
    },
    id: false,
});

thoughtsSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
})

//cascade effect to delete thoughts when user is deleted
thoughtsSchema.pre('remove', function(next){
    this.model('User').updateOne(
        { thoughts: this._id },
        { $pull: { thoughts: this._id } },
        { multi: true },
        next
    );
});

const Thought = model('Thought', thoughtsSchema);

module.exports = Thought;

//global serach