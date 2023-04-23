// const { Schema, model } = require('mongoose');

// const reactionSchema = new Schema (
//     {
//         reactionId: {
//             type: ObjectId,
//             default: () => new ObjectId,
//         },
//         reactionBody: {
//             type: String,
//             required: true,
//             maxlength: 280,
//         },
//         userName: {
//             type: String,
//             required: true,
//         },
//         createdAt: {
//             type: Date,
//             default: Date.now,
//             get: function (createdAt) {
//                 return new Date(createdAt).toDateString();
//             }
//         }
//     },{
//         timestamps: true,
//         toJSON: {
//             virtuals: true
//         }
//     }
// );

// module.exports = model('Reaction', reactionSchema)