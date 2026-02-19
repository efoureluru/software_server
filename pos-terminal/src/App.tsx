import React, { useEffect } from 'react';
// Main App Component
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import POS from './pages/POS';
import Login from './pages/Login';
import VerifyTicket from './pages/VerifyTicket';
import AdminDashboard from './pages/AdminDashboard';
import Accounts from './pages/Accounts';
import RideManagement from './pages/RideManagement';

function PrivateRoute({ children, role }: { children: React.ReactNode, role?: string }) {
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  // console.log('[PrivateRoute Debug]', { path: window.location.hash, roleRequired: role, userRole: user?.role, hasToken: !!token });

  if (!token || !user) {
    console.warn('[PrivateRoute] No token/user, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    console.warn(`[PrivateRoute] Role mismatch. Required: ${role}, Got: ${user.role}`);
    if (user.role === 'admin') return <Navigate to="/admin" replace />;
    if (user.role === 'scanner') return <Navigate to="/verify" replace />;
    return <Navigate to="/pos" replace />;
  }

  // Special Case: Block Scanner from POS
  if (user.role === 'scanner' && !window.location.hash.includes('/verify')) {
    return <Navigate to="/verify" replace />;
  }

  // Special Case: Block Admin from POS
  if (!role && user.role === 'admin' && window.location.hash.includes('/pos')) {
    console.warn('[PrivateRoute] Admin blocked from POS');
    return <Navigate to="/admin" replace />;
  }

  return children;
}

function App() {
  // Setup Global Axios Interceptors
  useEffect(() => {
    // Request Interceptor: Attach Token
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
          // Also set x-auth-token for legacy routes
          config.headers['x-auth-token'] = token;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response Interceptor: Auto Logout on 401/403
    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          console.error('[Interceptor] Auth Error:', error.response.status, error.config.url);
          if (!window.location.hash.includes('/login')) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.hash = '#/login';
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/pos"
          element={
            <PrivateRoute>
              <POS />
            </PrivateRoute>
          }
        />
        <Route
          path="/verify"
          element={
            <PrivateRoute>
              <VerifyTicket />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute role="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/accounts"
          element={
            <PrivateRoute role="admin">
              <Accounts />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/rides"
          element={
            <PrivateRoute role="admin">
              <RideManagement />
            </PrivateRoute>
          }
        />
        <Route path="/" element={
          localStorage.getItem('token')
            ? (JSON.parse(localStorage.getItem('user') || '{}').role === 'admin' ? <Navigate to="/admin" replace /> : <Navigate to="/pos" replace />)
            : <Navigate to="/login" replace />
        } />
      </Routes>
    </Router>
  );
}

export default App;
