const express = require("express")
const issueRouter = express.Router()
const Issue = require('../models/issue.js')

// Get all issues
issueRouter.get("/", (req, res, next) => {
  Issue.find((err, issues) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(issues)
  })
})

// Get all issues by user id
issueRouter.get("/user", (req, res, next) => {
  Issue.find({ user: req.user._id }, (err, issues) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(issues)
  })
})

// Get one issue
issueRouter.get('/:issueId', (req, res, next) => {
    Issue.findOne({ _id: req.params.issueId }, (err, issue) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(issue)
    })
})

//..req.body, upVotes: [], 
// Add new issue
issueRouter.post("/", (req, res, next) => {
  req.body.user = req.user._id
  const newIssue = new Issue(req.body)
  newIssue.save((err, savedIssue) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(201).send(savedIssue)
  })
})

// Delete issue
issueRouter.delete("/:issueId", (req, res, next) => {
  Issue.findOneAndDelete(
    { _id: req.params.issueId, user: req.user._id },
    (err, deletedIssue) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(`Successfully delete issue: ${deletedIssue.title}.`)
    }
  )
})

// Update issue
issueRouter.put("/:issueId", (req, res, next) => {
  Issue.findOneAndUpdate(
    { _id: req.params.issueId, user: req.user._id },
    req.body,
    { new: true },
    (err, updatedIssue) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(201).send(updatedIssue)
    }
  )
})

module.exports = issueRouter