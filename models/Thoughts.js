const { Schema, model } = require('mongoose');


const thoughtSchema = new Schema(
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
    reactions: [reactionSchema],

}, 
{ timestamps: true ,
    toJSON: {
        virtuals: true,
    }
});

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
})

//cascade effect to delete thoughts when user is deleted
thoughtSchema.pre('remove', function(next){
    this.model('User').updateOne(
        { thoughts: this._id },
        { $pull: { thoughts: this._id } },
        { multi: true },
        next
    );
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;