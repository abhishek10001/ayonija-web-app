import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from './components/AdminLayout';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import Jobs from './pages/Jobs';
import AddJob from './pages/AddJob';
import Applications from './pages/Applications';
import Subscribers from './pages/Subscribers';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route path='dashboard' element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="products/add" element={<AddProduct />} />
        <Route path="products/edit/:id" element={<EditProduct />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="jobs/add" element={<AddJob />} />
        <Route path="applications" element={<Applications />} />
        <Route path="subscribers" element={<Subscribers />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes; 