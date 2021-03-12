const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    comment: {
        type: String,
        required: true
    },
    upVotes: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    downVotes: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    issue: {
        type: Schema.Types.ObjectId,
        ref: "Issue",
        required: true
    }
})

module.exports = mongoose.model("Comment", commentSchema)