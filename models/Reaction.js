const { Schema, Types } = require('mongoose');
const moment = require('moment');


const reactionSchema = new Schema (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        userName: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: function (createdAt) {
                // Format the timestamp using Moment.js
           return moment(createdAt).format('MMMM Do YYYY, h:mm:ss a'); // check if works!!!
            }
        }
    },{
        timestamps: true,
        toJSON: {
            virtuals: true
        }
    }
);

module.exports =  reactionSchema;