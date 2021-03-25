import React, { useContext, useEffect } from 'react'
import IssueForm from './IssueForm.js'
import IssueList from './IssueList'
import Issue from './Issue'
import { UserContext } from '../context/UserProvider.js'


export default function Profile(){
  const { 
    user: { username }, userIssues, getUserIssues, addIssue } = useContext(UserContext)

  useEffect(() => {
    getUserIssues()
  }, [])

  return (
    <div className="profile">
      <h1>Welcome @{username}!</h1>
      <h3>Add An Issue</h3>
      <IssueForm addIssue={addIssue}/>
      <h3>Your Issues</h3>
      <div>
        {[...userIssues].map(issue => {
              return (
                <Issue {...issue} />
              )
          })}
      </div>
    </div>
  )
}