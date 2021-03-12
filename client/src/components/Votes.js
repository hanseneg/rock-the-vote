import React from 'react'

export default function Votes(props){
  const { title, description, _id } = props
  return (
    <div className="todo">
      <h1>{ title }</h1>
      <h3>{ description }</h3>
    </div>
  )
}