import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../context/UserProvider'
import Comment from '../components/Comment'
//import Votes from './Votes'

//issue itself to be mapped over and shown individually in the public page and profile page 
//in public page all issues are shown and in profile page only user's issues are shown 

export default function Issue(props){
    const { title, description, _id, upVotes, downVotes } = props


    //logic so only person can like or dislike once
    //checks to see if id is in upvotes or downvotes or neither to allow them to vote or not

    //for toggling the comment form on and off
    const [showCommentForm, setCommentForm] = useState(false)

    const showCommentForm1 = () => {
        setCommentForm(!showCommentForm)
    }

    //for adding a comment
    const { addComment, getIssueComments, upVote, downVote, user: { username }, } = useContext(UserContext)
    const initInput = { comment: "" } 
    const [comment, setComment] = useState(initInput)
    const [comments, setComments] = useState([])
    //const [upVoters, setUpVoters] = useState(upVotes)
    //const [downVoters, setDownVoters] = useState(downVotes)
    

    //put votes in state?

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
            .then(data => setComments(prevComments => [...prevComments, data]))
        setComment(initInput)
    }

    useEffect(() => {
        getIssueComments(_id)
        .then(data => setComments(data))
      }, [getIssueComments, _id, setComments])
    
    function upVoting(){
        upVote(_id)
    }

    function downVoting(){
        downVote(_id)
    }

    
    

    //for displaying comments
    //map over Comment here? to show comments for each issue or map over them in Comment.js component 

    return (
        <div>
            <hr className='hr'/>
            <h2>{title}</h2>
            {/* username does not show up for some reason */}
            <p>Issue left by: {username}</p>
            <p className='description'>{description}</p>
            {/* <Votes _id={_id} votes={{upVotes: upVotes, downVotes: downVotes}}/> */}


            <button className='button' onClick={upVoting} >Agree</button>
            <p>{upVotes.length}</p>
            <button className='button' onClick={downVoting} >Disagree</button>
            <p>{downVotes.length}</p>


            <button className='button' onClick={showCommentForm1} >Leave a Comment</button>
            {showCommentForm && (
                <form onSubmit={handleSubmit}>
                        <textarea 
                            type='text'
                            onChange={handleChange}
                            name='comment'
                            placeholder='Comment'
                            value={comment.comment}
                        />
                        <button className='button'>Submit Comment</button>
                </form>
            )}
            <div>
                {comments.map(comment => {
                    return (
                        <Comment key={comment._id} {...comment} _id={_id} /> 
                    )
                })}
            </div>  
            
           
            {/* <button>Show all Comments</button> */}
        </div>
    )
}



    //way to grab values from url
    //const { issueId } = useParams()

    //upVote and downVote from context are actually like upVoting and downVoting

    // function onUpVote(){
    //     upVote(upVoters, _id)
    //         .then(voteData => setUpVoters(prevVotes => [...prevVotes, voteData]))
    //     setUpVoters(upVotes)
    // }