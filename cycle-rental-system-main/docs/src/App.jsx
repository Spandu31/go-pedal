import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = lazy(() => import('./components/Navbar'));
const Home = lazy(() => import('./components/Home'));
const Login = lazy(() => import('./components/Login'));
const Features = lazy(() => import('./components/Features'));
const Signup = lazy(() => import('./components/Signup'));
const AvailableCycles = lazy(() => import('./components/AvailableCycles'));
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'));
const Payment = lazy(() => import('./components/Payment'));
const Checkout = lazy(() => import('./components/Checkout'));
const AdminDashboard = lazy(() => import('./components/AdminDashboard'));
const NotFound = lazy(() => import('./components/NotFound'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/features" element={<Features />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/available-cycles"
          element={
            <ProtectedRoute>
              <AvailableCycles />
            </ProtectedRoute>
          }
        />
        <Route path="/payment" element={<Payment />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={3000} />
    </Suspense>
  );
}

export default App;
