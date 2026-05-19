import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { motion } from 'framer-motion'

import Home from './pages/Home/Home'
import Cart from './pages/cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import MyOrders from './pages/MyOrders/MyOrders'

import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Navbar from './components/Navbar/Navbar'

const App = () => {

  const [showLogin, setShowLogin] = useState(false)

  useEffect(() => {

    const openLogin = () => {
      setShowLogin(true)
    }

    window.addEventListener('openLoginPopup', openLogin)

    return () => {
      window.removeEventListener('openLoginPopup', openLogin)
    }

  }, [])

  return (

    <div className='bg-[#f8f8f8] dark:bg-slate-900 min-h-screen transition-all duration-500'>

      {/* LOGIN POPUP */}

      {showLogin && (
        <LoginPopup setShowLogin={setShowLogin} />
      )}

      {/* MAIN APP */}

      <div className='app'>

        {/* NAVBAR */}

        <Navbar setShowLogin={setShowLogin} />

        {/* ROUTES */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='pt-5'
        >

          <Routes>

            <Route
              path='/'
              element={<Home />}
            />

            <Route
              path='/cart'
              element={<Cart />}
            />

            <Route
              path='/order'
              element={<PlaceOrder />}
            />

            <Route
              path='/myorders'
              element={<MyOrders />}
            />

          </Routes>

        </motion.div>

      </div>

      {/* FOOTER */}

      <Footer />

    </div>

  )

}

export default App