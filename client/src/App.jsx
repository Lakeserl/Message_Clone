import React from 'react'
import {Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import Profile from './pages/ProfilePage'

const App = () => {
  return (
    <div className="bg-[url('/src/assets/bgImage.svg')] bg-contain">
      <Routes>
        <Route path='/home' element={<HomePage />}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/profile' element={<Profile/>}/>
        
      </Routes>
    </div>
  )
}

export default App