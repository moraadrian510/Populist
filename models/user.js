const { Schema, model } = require('mongoose');


const userSchema  = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        }
    ],
},
{
    toJSON: {
        virtuals:true,
    }
}
)

module.exports = model('User', userSchema);