// src/App.js
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import LoginPage from './components/pages/LoginPage';
import SignupPage from './components/pages/SignupPage';
import Policy from './components/pages/Policy';
import Dashboard from './components/pages/Dashboard';
import ForgotPassword from './components/pages/ForgotPassword';
import ResetPassword from './components/pages/ResetPassword';
import AdminLayout from './components/layouts/AdminLayout';
import { AdminUser } from './components/pages/AdminUser';
import AdminEvent from './components/pages/AdminEvent';
import UploadEvents from './components/pages/UploadEvents';
import AllEvents from './components/pages/AllEvents';
import AdminLogin from './components/pages/AdminLogin';
import PrivateRoute from './components/PrivateRoute'; // Import PrivateRoute
import { AuthProvider } from './components/AuthContext'; // Import AuthProvider

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" exact element={<Home />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword/:token" element={<ResetPassword />} />

          {/* Admin */}
          <Route path="/admin" element={<AdminLogin />} />

          <Route
            path="/adminpanel"
            element={<PrivateRoute element={<AdminLayout />} />}
          >
            <Route path="users" element={<AdminUser />} />
            <Route path="events" element={<AdminEvent />} />
            <Route path="uploadevents" element={<UploadEvents />} />
          </Route>

          <Route path="/allevents" element={<AllEvents />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
