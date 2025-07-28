import { useState } from 'react'
import './App.css'
import MainPage from './MainPage'
import SignUpPage from './SignUpPage'
import SignInPage from './SignInPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/sign-up" element={<SignUpPage />}/>
          <Route path="/sign-up/doctor" element={<SignUpPage />}/>
          <Route path="/sign-in" element={<SignInPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
