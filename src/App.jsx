import React,{useState,useEffect} from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { BrowserRouter as Router } from 'react-router-dom';
const App = () => {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])
  
  return !loading ? (
    <Router>
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
        TODO:  <Outlet />
        </main>
        <Footer />
      </div>
    </div>
    </Router>
  ) : null
}

export default App