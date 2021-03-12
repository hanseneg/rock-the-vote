import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App.js'
import UserProvider from './context/UserProvider.js'


ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <App/>
    </UserProvider>
  </BrowserRouter>, 
  document.getElementById('root')
)