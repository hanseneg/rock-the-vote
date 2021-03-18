import React, {useState} from 'react'
import axios from 'axios'

export const UserContext = React.createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function UserProvider(props){
    const initState = { 
        user: JSON.parse(localStorage.getItem('user')) || {},
        token: localStorage.getItem('token') || '',
        userIssues: [],
        errMsg: ''
    }

    const [userState, setUserState] = useState(initState)
    const [allIssues, setAllIssues] = useState([])
    const [issueComments, setIssueComments] = useState([])

    function signup(credentials){
        axios.post('/auth/signup', credentials)
            .then(res => {
                const { user, token } = res.data
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))
                setUserState(prevUserState => ({
                    ...prevUserState,
                    user, token
                }))
            })
            .catch(err => handleAuthErr(err.response.data.errMsg))
    }

    function login(credentials){
        axios.post('/auth/login', credentials)
            .then(res => {
                const { user, token } = res.data
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))
                getAllIssues()
                getUserIssues()
                setUserState(prevUserState => ({
                    ...prevUserState,
                    user, token
                }))
            })
            .catch(err => handleAuthErr(err.response.data.errMsg))
    }

    function logout(){
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUserState({
            user: {},
            token: '',
            userIssues: []
        })
    }
    function handleAuthErr(errMsg){
        setUserState(prevState => ({
          ...prevState,
          errMsg
        }))
      }
    
      function resetAuthError(){
        setUserState(prevState => ({
          ...prevState,
          errMsg: ''
        }))
      }    

    function getAllIssues(){
        userAxios.get('/api/issue')
            .then(res => setAllIssues(res.data))
            .catch(err => console.log(err.response.data.errMsg))
    }

    function getUserIssues(){
        userAxios.get('/api/issue/user')
            .then(res => {
                setUserState(prevState => ({
                    ...prevState,
                    userIssues: res.data
                }))
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    function addIssue(newIssue){
        userAxios.post('/api/issue', newIssue)
            .then(res => {
                setAllIssues(prevIssues => [...prevIssues, res.data])
                setUserState(prevState => ({
                    ...prevState,
                    userIssues: [...prevState.userIssues, res.data]
                }))
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    function getIssueComments(issueId) {
        userAxios.get(`/api/comment/issue/${issueId}`)
            .then(res => setIssueComments(res.data))
            .catch(err => console.log(err.response.data.errMsg))
    }

    function addComment(newComment, issueId) {
        userAxios.post(`/api/comment/${issueId}`, newComment)
            .then(res => setIssueComments(prevComment => [...prevComment, res.data]))
            .catch(err => console.log(err.response.data.errMsg))
    }

    return (
        <UserContext.Provider
            value={{
                ...userState,
                signup, 
                login,
                logout,
                getAllIssues,
                allIssues,
                getUserIssues,
                addIssue,
                issueComments,
                getIssueComments,
                addComment,
                resetAuthError
            }}
        >
            { props.children }
        </UserContext.Provider>
    )
}