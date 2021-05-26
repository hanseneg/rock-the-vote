import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(props){
  const { logout } = props
  return (
    <div className="navbar">
      <Link className='nav' to="/profile">Profile</Link>
      <Link className='nav' to="/public">Public</Link>
      <button className='nav' className='logout' onClick={logout}>Logout</button>
    </div>
  )
}