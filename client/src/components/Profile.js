import React, { useContext } from 'react'
import IssueForm from './IssueForm.js'
import IssuePage from './IssuePage'
import Issue from './Issue'
import { UserContext } from '../context/UserProvider.js'


export default function Profile(){
  const { 
    user: { username }, 
    userIssues,
    getUserIssues,
    addIssue, 
    issues 
  } = useContext(UserContext)

  return (
    <div className="profile">
      <h1>Welcome @{username}!</h1>
      <h3>Add An Issue</h3>
      <IssueForm addIssue={addIssue}/>
      <h3>Your Issues</h3>
      <IssuePage issues={issues}/>

    </div>
  )
}