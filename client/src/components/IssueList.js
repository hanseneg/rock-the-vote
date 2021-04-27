/* import React, {useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../context/UserProvider'
import Issue from './Issue'
import IssueForm from './IssueForm'
import Comment from './Comment'

//create 2 contexts one with login and signup and other with everything else
//issuelist shows another page with react link to show the comments easier-not necassary but nice

const userAxios = axios.create()
userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function IssueList(props){
  //const { issueId } = useParams()
  const { issueComments, getIssueComments } = useContext(UserContext)
  const [issue, setIssue] = useState(false)

/*   function getOneIssue() {
    userAxios.get(`/api/issue/${issueId}`)
    .then(res => setIssue(res.data))
    .catch(err => console.log(err.response.data.errMsg))
  }
  
  useEffect(() => {
    getOneIssue()
    getIssueComments(issueId)
  }, []) */
  
  /* return (
    <div>
        
    </div>
  )
}  */