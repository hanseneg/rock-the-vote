import React, { useContext, useEffect}from 'react'
import { UserContext } from '../context/UserProvider'
import Issue from './Issue.js'
import { Link } from 'react-router-dom'


//map over issues here and display all of them below using './Issue' template


export default function Public(){
  const { user: {username}, allIssues, getAllIssues } = useContext(UserContext)

  useEffect(() => {
    getAllIssues()
  }, [])

  return (
    <div className="public">
        <h1>Public Page</h1>
        <h3>Hello @{username}</h3>
        <div>
            {[...allIssues].map(issue => {
              return (
                <Issue {...issue} />
              )
            })}
        </div>
    </div>
  )
}