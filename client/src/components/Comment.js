import React, { useContext, useEffect } from 'react'
import { UserContext } from '../context/UserProvider'

export default function Comment(props){

    //const { user: {username}, comment, _id } = useContext(UserContext) 

   const { user: { username }, comment } = props

    return (
        <div>
            <p>{username}</p>
            <p>{comment}</p>
        </div>
    )
}
