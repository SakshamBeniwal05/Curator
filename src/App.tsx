import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Login } from './Redux/slices/Log_status'
import './App.css'

const App: React.FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const restoreSession = async () => {
      try {
        // First check localStorage for user data
        const storedUser = localStorage.getItem('user')
        
        if (storedUser) {
          // If localStorage has user data, parse it and dispatch login
          const userData = JSON.parse(storedUser)
          dispatch(Login({ data: userData }))
        } else {
          // If localStorage is empty, don't dispatch login
          console.log('No user data in localStorage')
        }
      } catch (err) {
        console.error('Session restore failed:', err)
      }
    }

    restoreSession()
  }, [dispatch])

  return (
    <div>
      <Outlet />
    </div>
  )
}

export default App
