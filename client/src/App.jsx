import React from 'react'
import { BrowserRouter, Routes , Route } from 'react-router-dom'
import Home from './pages/Home'
import SignOut from './pages/SignOut'
import SingIn from './pages/SingIn'
import About from './pages/About'
import Profile from './pages/Profile'
import Header from './components/Header'

export default function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SingIn />} />
        <Route path='/sign-out' element={<SignOut />} />
        <Route path='/about' element={<About />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}
