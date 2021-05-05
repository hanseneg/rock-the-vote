import React from 'react'

export default function Comment(props){

   const { user: { username }, comment } = props

    return (
        <div>
            <h4>Comment left by: {username}</h4>
            <p>{comment}</p>
        </div>
    )
}