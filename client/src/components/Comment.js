import React, { useContext, useEffect } from 'react'
import { UserContext } from '../context/UserProvider'
// import { useParams } from 'react-router-dom'

export default function Comment(props){

    const { user: {username}, comment, getIssueComments, _id, issueComments } = useContext(UserContext) 

    // const { issueId } = useParams()

    // useEffect(() => {
    //     getIssueComments(issueId)
    //   }, [getIssueComments])

   /*  const { user: { username}, comment } = props  */

    return (
        <div>
            <p>{username}</p>
            <p>{comment}</p>
        </div>
        /* <div>
                {[...issueComments].map(comment => {
                    return (
                        //<Comment key={comment._id} {...comment} />
                        <div>
                            <p>{username}</p>
                            <p key={comment._id} {...comment}>{comment}</p>
                        </div>
                    )
                })}
        </div> */
    )
}
