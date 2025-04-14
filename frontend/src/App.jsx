import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import AllProducts from './pages/AllProducts'
import Carriers from './pages/Carriers'
import Contact from './pages/Contact'

// About sub-pages
import Team from './pages/about/Team'
import News from './pages/about/News'

// Products sub-pages
import Supplements from './pages/products/Supplements'

// Carriers sub-pages
import Benefits from './pages/carriers/Benefits'
import Culture from './pages/carriers/Culture'

// Admin
import Login from './admin/pages/Login'
import AdminRoutes from './admin/routes'

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-neutral-light">
        {/* <Navbar /> */}
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/carriers" element={<Carriers />} />
          <Route path="/contact" element={<Contact />} />

          {/* About Sub-routes */}
          <Route path="/about/team" element={<Team />} />
          <Route path="/about/news" element={<News />} />

          {/* Products Sub-routes */}
          <Route path="/products/supplements" element={<Supplements />} />

          {/* Carriers Sub-routes */}
          <Route path="/carriers/benefits" element={<Benefits />} />
          <Route path="/carriers/culture" element={<Culture />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

