const mongoose = require('mongoose')
const Schema = mongoose.Schema

const issueSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    //wrap in array
    //no need to default

    upVotes: {
        type: [Schema.Types.ObjectId],
        ref: "User"
    },
    downVotes: {
        type: [Schema.Types.ObjectId],
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
    }
})

module.exports = mongoose.model("Issue", issueSchema)