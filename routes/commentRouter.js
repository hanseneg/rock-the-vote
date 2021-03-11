const express = require("express")
const commentRouter = express.Router()
const Comment = require('../models/comment.js')

// get all comments by issue
commentRouter.get("/issue/:issueId", (req, res, next) => {
    Comment.find({ issue: req.params.issueId }, (err, comments) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(comments)
    })
  })

// get all comments from user needed???
commentRouter.get("/user", (req, res, next) => {
  Comment.find({ user: req.user._id }, (err, comments) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(comments)
  })
})

// Get one comment needed???
commentRouter.get('/:commentId', (req, res, next) => {
    Comment.findOne({ _id: req.params.commentId }, (err, comment) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(comment)
    })
})

// post a comment
commentRouter.post("/:issueId", (req, res, next) => {
  req.body.user = req.user._id
  req.body.issue = req.params.issueId
  const newComment = new Comment(req.body)
  newComment.save((err, savedComment) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(201).send(savedComment)
  })
})

module.exports = commentRouter