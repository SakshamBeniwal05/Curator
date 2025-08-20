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
        // Check localStorage for user data with key 'user'
        const storeUser = localStorage.getItem('user')
        
        if (storeUser) {
          const userData = JSON.parse(storeUser)
          // Check if userData has actual values (not just an empty object)
          if (userData && Object.keys(userData).length > 0 && userData.id) {
            // If userData has meaningful data, dispatch login
            dispatch(Login({ data: userData }))
          } else {
            // If userData is empty object or has no meaningful data, don't dispatch
            console.log('User data is empty object, not dispatching login')
          }
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
