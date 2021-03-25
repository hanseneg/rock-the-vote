import React from 'react'
import Votes from './Votes'

//issue itself to be mapped over and shown individually in the public page

export default function Issue(props){
    const { title, description, _id, user: { username }, upVotes, downVotes } = props

    return (
        <div>
            <h2>{title}</h2>
            <p>{username}</p>
            <p>{description}</p>
            {/* <Votes _id={_id} votes={{upVotes: upVotes, downVotes: downVotes}}/> */}
        </div>
    )
}