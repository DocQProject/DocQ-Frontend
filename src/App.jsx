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
import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'
import PostDetail from './components/PostDetail'
import PostCreate from './components/PostCreate'
import PostEdit from './components/PostEdit'


function AppContent() {
  const navigationBarHiddenUrl = ["/sign-up", "/sign-in", "/sign-up/doctor"]
  const location = useLocation();

  return (
    <>
      {!navigationBarHiddenUrl.includes(location.pathname) && <NavigationBar />}
      <Routes>
        <Route path="/" element={ <ProtectedRoute> <MainPage /> </ProtectedRoute>} />
        <Route path="/sign-up" element={<PublicRoute><SignUpPage /></PublicRoute>} />
        <Route path="/sign-up/doctor" element={<PublicRoute><SignUpPage /></PublicRoute>} />
        <Route path="/sign-in" element={<PublicRoute><SignInPage /></PublicRoute>} />
        <Route path="/search" element={<ProtectedRoute><ClinicSearchPage /></ProtectedRoute>} />
        <Route path="/review" element={<ProtectedRoute><ReviewPage /></ProtectedRoute>} />
        <Route path='/mypage' element={<ProtectedRoute><MyPage /></ProtectedRoute>} />
        <Route path='/board' element={<ProtectedRoute><Board /></ProtectedRoute>} />
        <Route path="/clinic/:id" element={<ProtectedRoute><ClinicPage /></ProtectedRoute>} />
        <Route path="/posts/new" element={<ProtectedRoute><PostCreate /></ProtectedRoute>} />
        <Route path="/posts/:id" element={<ProtectedRoute><PostDetail /></ProtectedRoute>} />
        <Route path="/posts/:id/edit" element={<ProtectedRoute><PostEdit /></ProtectedRoute>} />
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
