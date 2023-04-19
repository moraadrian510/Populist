const { Schema, model } = require('mongoose');

//User schema 
const userSchema = new Schema(
    {
        userName: {
            type: String,
            unique: true,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            trim: true,
            required: true,
            match: [/.+@.+\..+/],
        },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Thoughts"
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: "user"
        }
    ]
    },
    {
        toJSON: {
        virtuals: true,
        },
        id: false,
    }
);

UserSchema.virtual("friendCount").get(function () {
    return this.friends.length;
});

const User = model("User", UserSchema);

module.exports = User;