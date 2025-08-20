import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Login } from './Redux/slices/Log_status'
import AuthServices from './Services/auth'  // <-- your Appwrite service
import './App.css'

const App: React.FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const restoreSession = async () => {
      try {
        // Always check Appwrite first to verify if session is still valid
        const userdata = await AuthServices.Current_User()
        if (userdata && !userdata?.code) {
          // Valid session confirmed by Appwrite, store and dispatch login
          localStorage.setItem('user', JSON.stringify(userdata))
          dispatch(Login({ data: userdata }))
        } else {
          // No valid session from Appwrite, no dispatch
          console.log('No valid user session found')
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
