import { useState } from 'react'
import './App.css'
import MainPage from './MainPage'
import UserSignUpPage from './UserSignUpPage'
import SignInPage from './SignInPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MyPage from './MyPage'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/sign-up" element={<UserSignUpPage />}/>
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path='/mypage' element={<MyPage />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
