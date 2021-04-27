import React, { useState, useContext, /* useEffect */} from 'react'
import { UserContext } from '../context/UserProvider'
import Comment from '../components/Comment'
//import Votes from './Votes'
//import { useParams } from 'react-router-dom'

//issue itself to be mapped over and shown individually in the public page and profile page 
//in public page all issues are shown and in profile page only user's issues are shown 

export default function Issue(props){
    const { title, description, _id, user: { username }, /* upVotes, downVotes */ } = props
    //const { issueId } = useParams()

    

    //for toggling the comment form on and off
    const [showCommentForm, setCommentForm] = useState(false)

    const showCommentForm1 = () => {
        setCommentForm(!showCommentForm)
    }

    //for adding a comment
    const { addComment, /* getIssueComments, */ issueComments } = useContext(UserContext)

    // useEffect(() => {
    //     getIssueComments(_id)
    //   }, [])

    const initInput = { comment: "" } 
    const [comment, setComment] = useState(initInput)

    

    function handleChange(e){
        const {name, value} = e.target
        setComment(prevComment => ({
        ...prevComment,
        [name]: value
        }))
    }

    function handleSubmit(e){
        e.preventDefault()
        addComment(comment, _id)
        setComment(initInput)
    }

    

    //for displaying comments
    //map over Comment here? to show comments for each issue or map over them in Comment.js component 

    return (
        <div>
            <h2>{title}</h2>
            <p>{username}</p>
            <p>{description}</p>
            {/* <Votes _id={_id} votes={{upVotes: upVotes, downVotes: downVotes}}/> */}
            <button onClick={showCommentForm1} >Leave a Comment</button>

            {showCommentForm && (
                <form onSubmit={handleSubmit}>
                        <textarea 
                            type='text'
                            onChange={handleChange}
                            name='comment'
                            placeholder='Comment'
                            value={comment.comment}
                        />
                        <button>Submit Comment</button>
                </form>
            )}
            <Comment />
           
            <button>Show all Comments</button>
        </div>
    )
}

 /* <div>
                {[...issueComments].map(comment => {
                    return (
                        <Comment key={comment._id} {...comment} />
                    )
                })}
     </div> */