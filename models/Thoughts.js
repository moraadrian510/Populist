const { Schema, model } = require('mongoose');


const thoughtSchema = new Schema(
{
    thoughtText: {
        type:  String,
        required: true,
        minlength: 1,
        maxlength: 255,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
   createdAt: {
        type: Date,
        default: Date.now
   },
}, { timestamps: true });

thoughtSchema.pre('remove', function(next){
    this.model('User').updateOne(
        { thoughts: this._id },
        { $pull: { thoughts: this._id } },
        { multi: true },
        next
    );
});

const Thoughts = model('thoughts', thoughtSchema);

module.exports = Thoughts;