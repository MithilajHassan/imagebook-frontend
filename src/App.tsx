import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import HomePage from './Pages/HomePage'
import SigninForm from './Pages/SigninForm'
import SignupPage from './Pages/SignupPage'
import './App.css'
import PrivateRoutes from './components/user/Protection'
import ForgotPasswordPage from './Pages/ForgotPasswordPage'

function App() {

  return (
    <Router>
        <ToastContainer />
      <Routes>
        <Route path='/' element={<SigninForm />} />
        <Route path='/signin' element={<SigninForm />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/forgotpassword' element={<ForgotPasswordPage />} />
        <Route path='' element={<PrivateRoutes />} >
          <Route path='/images' element={<HomePage />} />
        </Route>

      </Routes>
    </Router>
  )
}

export default App
