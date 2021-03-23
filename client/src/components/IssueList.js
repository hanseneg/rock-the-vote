import React, {useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../context/UserProvider'
import Issue from './Issue'
import IssueForm from './IssueForm'
import Comment from './Comment'

//list of all the issues to be displayed on the public page?

const userAxios = axios.create()
userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function IssueList(props){
  const { issueId } = useParams()
  const { issueComments, getIssueComments } = useContext(UserContext)
  const [issue, setIssue] = useState(false)

  function getOneIssue() {
    userAxios.get(`/api/issue/${issueId}`)
    .then(res => setIssue(res.data))
    .catch(err => console.log(err.response.data.errMsg))
  }
  
  useEffect(() => {
    getOneIssue()
    getIssueComments(issueId)
  }, [])
  
  return (
    <div>
        {issue && <Issue {...issue} />}
        <IssueForm _id={issueId} />
        <div>
          {[...issueComments].reverse().map(comment => (
            <Comment key={comment._id} {...comment} />
          ))}
        </div>
    </div>
  )
}