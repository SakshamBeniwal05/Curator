import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
// <-- your Appwrite service
import './App.css'

const App: React.FC = () => {


  return (
    <div>
      <Outlet />
    </div>
  )
}

export default App
