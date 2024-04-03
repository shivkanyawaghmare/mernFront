import './App.css'
import { Route, Routes, BrowserRouter,Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import HomePage from './pages/HomePage'
import TransactionDashboard from './pages/TransactionDashbord'
import TransactionDesc from './pages/TransactionDesc'
import Statistics from './pages/Statistics'
import LandingPage from './pages/LandingPage'
function App() {
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<LandingPage />} />
            <Route path='/home' element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
            <Route path='/tradbord' element={<ProtectedRoute><TransactionDashboard/></ProtectedRoute>} />
            <Route path='/statistic' element={<ProtectedRoute><Statistics/></ProtectedRoute>} />
            <Route path='/transdesc/:id' element={<ProtectedRoute><TransactionDesc/></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}


export default App
export const ProtectedRoute = ({ children }) => {
  if (localStorage.getItem('user')) {
    return children
  } else {
    return <Navigate to="/" />
  }
}


