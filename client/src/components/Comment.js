import React from 'react'

export default function Comment(props){
    const { user: { username}, comment } = props

    return (
        <div>
            <p>{username}</p>
            <p>{comment}</p>
        </div>
    )
}