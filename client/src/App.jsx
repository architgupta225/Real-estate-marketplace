import React from 'react'
import Home from './pages/Home'
import SignOut from './pages/SignOut'
import SingIn from './pages/SingIn'
import About from './pages/About'
import Profile from './pages/Profile'

export default function App() {
  return (
    <BrowserRouter>
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
