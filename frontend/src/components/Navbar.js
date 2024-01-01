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
    <header className='Navbar grow-0 bg-white flex justify-between px-5 py-3 shadow'>
        <Link className="brandTitle text-yellow-400 font-bold text-2xl transition-colors hover:text-yellow-300" to="/">
          <h1>StudyHive</h1>
        </Link>
        <nav>
          {user && (
            <div>
              <span className='username font-semibold mx-2 text-lg text-gray-600 cursor-default transition-colors '>Welcome, {user.username}!</span>
              <button className='logout font-semibold mx-2 text-lg text-yellow-600 hover:text-white hover:bg-red-600 hover:border-red-600 transition-colors border-2 border-yellow-500 rounded px-2 pb-1' onClick={onClick}>Logout</button>
            </div>
          )}
          {/* : Add login and register links */}
          {/* {!user && (
            <div>
              <Link to="/login" className='font-semibold mx-2 text-lg text-gray-600 hover:text-gray-400 transition-colors'>Login</Link>
              <Link to="/register" className='font-semibold mx-2 text-lg text-gray-600 hover:text-gray-400 transition-colors'>Register</Link>
            </div>
          )} */}
        </nav>
    </header>
  )
}

export default Navbar