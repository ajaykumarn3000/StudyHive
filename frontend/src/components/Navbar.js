import React from 'react'
import { Link } from 'react-router-dom'
import useUserContext from '../hooks/useUserContext'

function Navbar() {
  const { user } = useUserContext()
  const {dispatch} = useUserContext()

  const onClick = () => {
    dispatch({type: "LOGOUT"})
  }

  return (
    <header>
        <Link className="brandTitle" to="/">
          <h1>Workout Buddy</h1>
        </Link>
        <nav>
          {user && (
            <div>
              <span className='username'>{user.username}</span>
              <button className='logout' onClick={onClick}>Logout</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          )}
        </nav>
    </header>
  )
}

export default Navbar