const { Schema, model } = require('mongoose');


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
            // formast the time stamp to a more readable string
            return new Date(createdAt).toDateString();
        }
    },
    userName: {
    type: String,
    ref: 'User',
    required: true,
    },
    // reactions: [reactionSchema],

}, 
{ timestamps: true ,
    toJSON: {
        virtuals: true,
    }
});

// thoughtsSchema.virtual('reactionCount').get(function() {
//     return this.reactions.length;
// })

//cascade effect to delete thoughts when user is deleted
thoughtsSchema.pre('remove', function(next){
    this.model('User').updateOne(
        { thoughts: this._id },
        { $pull: { thoughts: this._id } },
        { multi: true },
        next
    );
});

const Thoughts = model('Thoughts', thoughtsSchema);

module.exports = Thoughts;