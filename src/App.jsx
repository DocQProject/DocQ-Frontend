import './App.css'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import MainPage from './components/MainPage'
import SignUpPage from './components/SignUpPage'
import SignInPage from './components/SignInPage'
import ClinicSearchPage from './components/ClinicSearchResultPage'

import ReviewPage from './components/ReviewPage'
import ClinicPage from './components/ClinicPage'
import MyPage from './components/MyPage'
import Board from './components/Board'
import NavigationBar from './components/common/NavigationBar'


function AppContent() {
  const navigationBarHiddenUrl = ["/sign-up", "/sign-in", "/sign-up/doctor"]
  const location = useLocation();

  return (
    <>
      {!navigationBarHiddenUrl.includes(location.pathname) && <NavigationBar />}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/sign-up/doctor" element={<SignUpPage />} />
        <Route path="/sign-up/doctor" element={<SignUpPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/search" element={<ClinicSearchPage />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/board' element={<Board />} />
        <Route path="/clinic" element={<ClinicPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <>
      <Router>
        <AppContent />
      </Router>
    </>
  )
}

export default App
