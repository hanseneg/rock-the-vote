import React, { useState } from 'react'
import { UserContext } from '../context/UserProvider'

const initInputs = {
  title: "",
  description: "",
  comment: ""
}

export default function IssueForm(props){
  const [inputs, setInputs] = useState(initInputs)
  const { addIssue, addComment, _id } = props

  const { title, description, comment } = inputs

  function handleChange(e){
    const {name, value} = e.target
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }

  function handleSubmit(e){
    e.preventDefault()
    addIssue(inputs)
    addComment(inputs, _id)
    setInputs(initInputs)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        name="title" 
        value={title} 
        onChange={handleChange} 
        placeholder="Title"/>
      <input 
        type="text" 
        name="description" 
        value={description} 
        onChange={handleChange} 
        placeholder="Description"/>
      <input 
        type="text" 
        name="comment" 
        value={comment} 
        onChange={handleChange} 
        placeholder="Comment"/>
      <button>Add Issue</button>
    </form>
  )
}