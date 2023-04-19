const { Schema, model } = require('mongoose');

const userSchema  = new Schema({
    userName: {
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
            ref: 'Thoughts',
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