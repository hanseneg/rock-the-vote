const express = require("express")
const voteRouter = express.Router()
const Issue = require('../models/issue.js')

voteRouter.put('/up/issue/:issueId', (req, res, next) => {
    Issue.findByIdAndUpdate(
        { _id: req.params.issueId },
        { $addToSet: { upVotes: req.user._id } },
        { new: true },
        (err, upVotedIssue) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(upVotedIssue)
        }
    )
})

voteRouter.put('/down/issue/:issueId', (req, res, next) => {
    Issue.findByIdAndUpdate(
        { _id: req.params.issueId },
        { $addToSet: { downVotes: req.user._id } },
        { new: true },
        (err, downVotedIssue) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(downVotedIssue)
        }
    )
})

module.exports = voteRouter


//{ $inc: { votes: 1 } }