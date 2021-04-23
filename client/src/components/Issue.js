import React, { useState, useContext} from 'react'
import { UserContext } from '../context/UserProvider'
import Votes from './Votes'

//issue itself to be mapped over and shown individually in the public page

export default function Issue(props){
    const { title, description, _id, user: { username }, upVotes, downVotes } = props

    const { addComment } = useContext(UserContext)

    const [showCommentForm, setCommentForm] = useState(false)

    const showCommentForm1 = () => {
        setCommentForm(!showCommentForm)
    }

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
                        <button >Submit Comment</button>
                </form>
            )}
        </div>
    )
}