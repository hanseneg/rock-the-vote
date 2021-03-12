import React from 'react'
import Votes from './Votes'

export default function Issue(props){
    const { title, description, _id, user: { username }, upVotes, downVotes } = props

    return (
        <div>
            <h2>{title}</h2>
            <p>{username}</p>
            <p>{description}</p>
            <Votes _id={_id} votes={{upVotes}, {downVotes}}/>
        </div>
    )
}