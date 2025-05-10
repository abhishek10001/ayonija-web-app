import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Main pages
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

// Admin pages
import Login from './admin/pages/Login'
import AdminLayout from './admin/components/AdminLayout'
import Dashboard from './admin/pages/Dashboard'
import Products from './admin/pages/Products'
import AddProduct from './admin/pages/AddProduct'
import EditProduct from './admin/pages/EditProduct'
import Jobs from './admin/pages/Jobs'
import AddJob from './admin/pages/AddJob'
import Applications from './admin/pages/Applications'
import Subscribers from './admin/pages/Subscribers'

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
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="products/add" element={<AddProduct />} />
            <Route path="products/edit/:id" element={<EditProduct />} />
            <Route path="jobs" element={<Jobs />} />
            <Route path="jobs/add" element={<AddJob />} />
            <Route path="applications" element={<Applications />} />
            <Route path="subscribers" element={<Subscribers />} />
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App

