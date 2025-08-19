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
        // if you stored raw user in localStorage
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
          dispatch(Login({ data: JSON.parse(storedUser) }))
          return
        }

        // safer: call Appwrite to verify session
        const userdata = await AuthServices.Current_User()
        if (userdata && !userdata?.code) {
          localStorage.setItem('user', JSON.stringify(userdata))
          dispatch(Login({ data: userdata }))
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
